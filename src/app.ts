import express, { Application } from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './middlewares/cors';
import userRoutes from './routes/user.routes';
import { setupSwagger } from './config/swagger';
import paymentRouter from './routes/payment.routes';
import accRouter from './routes/account.routes';
import transRouter from './routes/transaction.routes';
import coinRouter from './routes/coin.routes';
import fileRouter from './routes/file.routes';
import path from 'path';
import cron from 'node-cron';
import Payment from './models/user/payment.model';
import chainRouter from './routes/chain.routes';
import authRoutes from './routes/auth.routes';
import AiEarning from './models/user/ai-earning.model';
import aiRouter from './routes/aiEarning.routes';
import dailyRouter from './routes/dailyEarning.routes';
import DailyEarning from './models/user/daily-earning.model';
import UserService from './services/user.service';
import PaymentService from './services/payment.service';
import TransactionService from './services/transaction.service';
import ChainService from './services/chain.service';
import User from './models/user/user.model';
import Transaction from './models/user/transaction.model';
const { Op } = require('sequelize');

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(corsMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes, authRoutes, paymentRouter, accRouter, transRouter, coinRouter, fileRouter, chainRouter, aiRouter, dailyRouter);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Swagger Docs
setupSwagger(app);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.put('/api/ai-earnings', async (req, res) => {
  try {
    await updateAIEarningsForAllUsers();
    res.status(200).json({ message: 'Ai earnings updated successfully' });
  } catch (error) {
    console.error('Error updating AI earnings:', error);
    res.status(500).json({ message: 'Error updating daily earnings' });
  }
});

app.put('/api/daily-earnings', async (req, res) => {
  try {
    await updateDailyEarningsForAllUsers();
    res.status(200).json({ message: 'Daily earnings updated successfully' });
  } catch (error) {
    console.error('Error updating daily earnings:', error);
    res.status(500).json({ message: 'Error updating daily earnings' });
  }
});

async function updateAIEarningsForAllUsers() {
  try {
    const allUsers = await Transaction.findAll({
      where: {
        paymentType: 'trade',
        status: 'completed'
      }
    });

    for (const user of allUsers) {
      if (user) {
        const existingUser = await Payment.findOne({ where: { userId: user.userId } });

        if (existingUser && existingUser.commission > 0 && existingUser.selfInvestment > 0) {
          const { commission, selfInvestment, earnWallet, payId } = existingUser;

          const newEarnWallet = earnWallet + parseFloat(user.transactionId ?? '0');
          const aiEarningValue = parseFloat(user.transactionId ?? '0');
          const newAiEarnings = existingUser.aiEarning + aiEarningValue;

          console.log('Updated earnWallet:', newEarnWallet);

          // Update earnWallet and aiEarning for the user
          await Payment.update(
            {
              earnWallet: newEarnWallet,
              aiEarning: newAiEarnings
            },
            { where: { payId } }
          );

          // Record the AI earning
          await AiEarning.create({
            userId: user.userId,
            userName: user.userName,
            receiverId: user.userId,
            receiverName: user.userName,
            aiEarning: aiEarningValue,
            status: 'paid'
          });

          console.log(`AI earnings for userId ${payId} updated.`);
        }
      }
    }
  } catch (error) {
    console.error('Error updating AI earnings for all users:', error);
  }
}


// Adjusted autoCreateDailyEarnings function
// Assuming Payment is a Sequelize model
async function updateDailyEarningsForAllUsers() {
  try {
    // Fetch all users from the User table
    const allUsers = await Transaction.findAll({
      where: {
        paymentType: 'trade',
        status: 'completed'
      }
    });

    for (const user of allUsers) {
      // Fetch the user's referral chain
      const userReferrals = await ChainService.getUserParentChain(user.userId);
      console.log(userReferrals);
      const removingSelectedUserReferrals = userReferrals.filter(item => item.userId !== user.userId);

      console.log(removingSelectedUserReferrals);

      if (removingSelectedUserReferrals.length > 0) {
        await processReferralEarnings(removingSelectedUserReferrals, user);
      }
    }
  } catch (error) {
    console.error('Error updating daily earnings for all users:', error);
  }
}

async function processReferralEarnings(referrals: any, selectedUser: any) {
  for (let i = 0; i < referrals.length; i++) {
    const referral = referrals[i];
    const level = i + 1;  // Determine the referral level (1-based index)
    const referralPercentage = getReferralPercentage(level);  // Get percentage based on level

    // Fetch existing payment details
    const paymentDetails = await Payment.findOne({ where: { userId: referral.userId } });

    if (paymentDetails?.commission && paymentDetails.selfInvestment) {  // Proceed if payment details exist
      // Calculate additional earnings based on referral percentage
      const additionalEarnings = (selectedUser.transactionId || 0) * (referralPercentage / 100);
      //const additionalEarnings = (paymentDetails.aiEarning || 0) * (referralPercentage / 100);
      const updatedEarnings = (paymentDetails.earnWallet || 0) + additionalEarnings;
      const updatedDailyEarnings = (paymentDetails.dailyLevelEarning || 0) + additionalEarnings;

      // Update user's earnWallet and dailyEarning in the Payment table
      await Payment.update(
        {
          earnWallet: updatedEarnings,
          dailyLevelEarning: updatedDailyEarnings
        },
        { where: { payId: paymentDetails.payId } }
      );

      // Create a record in the DailyEarning table
      await DailyEarning.create({
        userId: referral.userId,
        userName: referral.name,
        receiverId: selectedUser.userId,
        receiverName: selectedUser.userName,
        dailyEarning: additionalEarnings,
        status: 'paid'
      });

      console.log(`Updated earnings for referral level ${level} of userId ${referral.userId}: ${updatedEarnings}`);
    }
  }
}


// Function to determine percentage based on referral level
function getReferralPercentage(level: number) {
  switch (level) {
    case 1:
      return 3;
    case 2:
      return 2;
    case 3:
    case 4:
    case 5:
      return 1;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return 0.5;
    default:
      return 0;
  }
}



// Schedule the auto-increment function to run daily at 1 AM
cron.schedule('0 0 * * *', updateAIEarningsForAllUsers);
// Schedule the auto-increment function to run daily at 1 AM
cron.schedule('0 0 * * *', updateDailyEarningsForAllUsers);
// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;

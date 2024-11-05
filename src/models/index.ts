import sequelize from '../config/database';
import User from './user/user.model';
import Payment from './user/payment.model';
import AccountDetails from './user/account.model';
import Transaction from './user/transaction.model';
import defineAssociationsDynamically from '../associations';
import Coin from './user/coin.model';
import AiEarning from './user/ai-earning.model';
import DailyEarning from './user/daily-earning.model';

const models = {
  User,
  Payment,
  AccountDetails,
  Transaction,
  Coin,
  AiEarning,
  DailyEarning
};

const modelAssociations = {
  User: {
    hasMany: [
      {
        targetModel: 'Payment',
        foreignKey: 'userId',
        as: 'payments', // Alias for the payments relationship
      },
      {
        targetModel: 'AccountDetails',
        foreignKey: 'userId',
        as: 'accountDetails', // Alias for the account details relationship
      },
      {
        targetModel: 'Transaction',
        foreignKey: 'userId',
        as: 'transactions', // Alias for the transactions relationship
      }
    ]
  },
  Payment: {
    belongsTo: [
      {
        targetModel: 'User',
        foreignKey: 'userId',
        as: 'user' // Alias for the reverse relationship (user)
      }
    ]
  },
  AccountDetails: {
    belongsTo: [
      {
        targetModel: 'User',
        foreignKey: 'userId',
        as: 'user' // Alias for the reverse relationship (user)
      }
    ]
  },
  Transaction: {
    belongsTo: [
      {
        targetModel: 'User',
        foreignKey: 'userId',
        as: 'user' // Alias for the reverse relationship (user)
      }
    ]
  },
  AiEarning: {
    belongsTo: [
      {
        targetModel: 'User',
        foreignKey: 'userId',
        as: 'user' // Alias for the reverse relationship (user)
      }
    ]
  },
  DailyEarning: {
    belongsTo: [
      {
        targetModel: 'User',
        foreignKey: 'userId',
        as: 'user' // Alias for the reverse relationship (user)
      }
    ]
  }
}

defineAssociationsDynamically(models, modelAssociations);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: true });  // Sync tables
    console.log('Models synchronized');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export { initDb, models };

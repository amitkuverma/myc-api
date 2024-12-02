import Payment from '../models/user/payment.model';
import User from '../models/user/user.model';
import { hashPassword } from '../utils/authUtils';
import PaymentService from '../services/payment.service';

interface UserRegistrationData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  referralCode?: string;
}

export default class UserService {
  // Fetch all users with specific fields
  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserById(userId: any) {
    return await User.findByPk(userId);
  }





  static async updateUserStatus(userId: any, status: any) {
    const user: any = await User.findByPk(userId);
    const referral = await Payment.findOne({ where: { userId: user.parentUserId } });
    const referee = await Payment.findOne({ where: { userId } });


    if (!user) {
      throw new Error('User not found');
    }

    if (referral) {
      referral.totalAmount += 100;
      await referral.save();
    }

    if (referee) {
      referee.status = 'live'
      await referee.save();
    }

    user.status = status;
    await user.save();
    return user;
  }

  static async updateUser(data: any) {
    return User.update(data, { where: { userId: data.userId } });
  }

  static async updateUserCoinsByMobile(data: any) {
    // Ensure `mobile` is being used to find the user
    const user: any = await User.findOne({ where: { email: data.email } });
    
    if (!user) return null;  // Handle case where user is not found
  
    user.coins = data.coins;
    await user.save();
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      coins: user.coins
    };
  }

  // Create a user with optional referral handling
  static async createUser(data: UserRegistrationData) {
    return await this.registerUserWithReferral(data);
  }

  private static generateReferralCode(): string {
    const prefix = "REF";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length));

    return `${prefix}${randomNum}${randomLetter1}${randomLetter2}`;
  }

  private static async generateUniqueReferralCode(): Promise<string> {
    let referralCode!: string;
    let isUnique = false;

    while (!isUnique) {
      referralCode = this.generateReferralCode();
      const existingUser = await User.findOne({ where: { referralCode } });
      isUnique = !existingUser;
    }

    return referralCode;
  }

  private static async registerUserWithReferral(data: UserRegistrationData) {
    const { name, email, mobile, password, referralCode } = data;
    const hashedPassword = await hashPassword(password);
    let parentUserId: string | null = null;
  
    // Validate referral code and fetch parent userId
    if (referralCode) {
      const referrer = await User.findOne({ where: { referralCode } });
      if (referrer) {
        parentUserId = referrer.userId;
      } else {
        console.log(`Referral code ${referralCode} not found. Proceeding without parent userId.`);
      }
    }
  
    // Fetch the last user and generate the new userId
    let userId: string;
    try {
      const lastUser = await User.findOne({
        order: [['userId', 'DESC']],
      });
  
      let newIdNumber = 1; // Default to 1 if no users exist
      if (lastUser && lastUser.userId && lastUser.userId.startsWith("MYC")) {
        // Extract numeric part safely
        const lastIdNumber = parseInt(lastUser.userId.slice(3), 10); // "MYC0001" -> 1
        if (!isNaN(lastIdNumber)) {
          newIdNumber = lastIdNumber + 1;
        }
      }
  
      // Format the new `userId` with "MYC" prefix and 4-digit zero padding
      userId = `MYC${newIdNumber.toString().padStart(4, '0')}`;
    } catch (error) {
      console.error('Error while generating userId:', error);
      throw new Error('Unable to generate a new userId.');
    }
  
    console.log(`Generated userId for new user: ${userId}`);
  
    // Create a new user
    try {
      const newUser = await User.create({
        userId,
        name,
        email,
        mobile,
        password: hashedPassword,
        parentUserId,
        referralCode: await this.generateUniqueReferralCode(),
      });
  
      return newUser;
    } catch (error) {
      console.error('Error while creating new user:', error);
      throw new Error('Unable to register the user.');
    }
  }
  

  static async deleteUser(id: any) {
    const coin = await User.findByPk(id);
    if (coin) {
      await coin.destroy();
      return { message: 'User deleted successfully' };
    }
    throw new Error('User not found');
  }

}



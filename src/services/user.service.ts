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
    return await User.findAll({
      attributes: ['userId', 'name', 'email', 'mobile', 'emailVerified', 'referralCode', 'createdAt', 'status', 'filepath', 'filename'],
    });
  }

  static async getUserById(userId: any) {
    return await User.findByPk(userId, {
      attributes: ['userId', 'name', 'email', 'mobile', 'emailVerified', 'referralCode', 'createdAt', 'status', 'filepath', 'filename'],
    });
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

  static async updateUser(userId: any, data: any) {   
    return User.update(data, { where: { userId: userId } });
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
    let parentUserId: string | null = null; // Use string since userId is a string

    if (referralCode) {
      const referrer: any = await User.findOne({ where: { referralCode } });
      if (referrer) {
        parentUserId = referrer.userId; // Assuming userId is a string
      }
    }

    // Generate the userId here
    const lastUser = await User.findOne({
      order: [['userId', 'DESC']],
    });

    let newIdNumber = 1; // Default to 1 if no users exist
    if (lastUser && lastUser.userId) {
      // Extract numeric part from the last user’s ID (e.g., "AI0001" -> 1)
      const lastIdNumber = parseInt(lastUser.userId.slice(2), 10);
      newIdNumber = lastIdNumber + 1;
    }

    // Format the new `userId` with "AI" prefix and 4-digit zero padding
    const userId = `AI${newIdNumber.toString().padStart(4, '0')}`;
    console.log(`Generated userId for new user: ${userId}`);

    const newUser = await User.create({
      userId, // Assign the generated userId here
      name,
      email,
      mobile,
      password: hashedPassword,
      parentUserId,
      referralCode: await this.generateUniqueReferralCode(),
    });

    return newUser;
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



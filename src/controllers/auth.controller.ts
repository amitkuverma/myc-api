import { Request, Response } from 'express';
import User from '../models/user/user.model'; // Your Sequelize model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../utils/email.service'; // Utility for sending emails
import { hashPassword } from '../utils/authUtils';


class AuthController {
  async login(req: Request, res: Response) {
    const { userId, password } = req.body;

    try {
      // Check if user exists
      const user: any = await User.findOne({ where: { userId } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid userId or password' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid userId or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.userId, userName: user.name, status: user.status, emailVerified: user.emailVerified, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '8h', // Token expiration
      });

      return res.json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { userId, newPassword } = req.body;
    const user = await User.findByPk(userId);

    // Check if user exists and token is valid
    if (!user) return res.status(400).json({ message: 'Invalid user' });
    // if (user.resetTokenExpiry < Date.now()) return res.status(400).json({ message: 'Token expired' });

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password and clear the reset token
    user.password = hashedPassword;
    // user.resetToken = null;
    // user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful!' });
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate reset token and expiry time
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

      // Update the user record with the reset token and expiry time
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry.toString();
      await user.save();

      // Create the reset link
      const resetLink = `https://gorkhacoin.com/reset-password?token=${resetToken}&id=${user.userId}`;

      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetLink}`,
      });

      // Respond with success message
      res.status(200).json({ message: 'Password reset link sent!' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default new AuthController();
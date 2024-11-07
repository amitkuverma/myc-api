import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, mobile, password } = req.body; // Exclude referralUrl from body
    const referralCode:any = req.params.referralCode || null; // Get referralCode from request parameters
  
    try {
      const newUser = await UserService.createUser({ name, email, mobile, password, referralCode });
      res.status(201).json(newUser);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params; // Get the userId from request params
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error:any) {
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  }

  // Update User Status
  static async updateUserStatus(req: Request, res: Response) {
    try {
      const { userId } = req.params; // Get the userId from request params
      const { status } = req.body; // Get the new status from request body

      const updatedUser = await UserService.updateUserStatus(userId, status);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error:any) {
      res.status(500).json({ message: "Error updating user status", error: error.message });
    }
  }
  static async updateUser(req: Request, res: Response) {
    try {

      const updatedUser = await UserService.updateUser(req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error:any) {
      res.status(500).json({ message: "Error updating user status", error: error.message });
    }
  }

  static async deleteUserProfile(req: Request, res: Response){
    try {
      const { userId } = req.params; // Get the userId from request params
      const user = await UserService.deleteUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error:any) {
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  }
}

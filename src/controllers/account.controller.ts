import { Request, Response } from 'express';
import AccountDetailsService from '../services/account.service';

class AccountDetailsController {
  async createAccountDetails(req: Request, res: Response) {
    try {
      const accountDetails = await AccountDetailsService.createAccountDetails(req.body);
      res.status(201).json(accountDetails);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create account details' });
    }
  }

  async getAllAccountDetails(req: Request, res: Response) {
    try {
      const accountDetails = await AccountDetailsService.getAllAccountDetails();
      if (accountDetails) {
        res.json(accountDetails);
      } else {
        res.status(404).json({ error: 'Account details not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Unable to retrieve account details' });
    }
  }
  
  async getAccountDetails(req: Request, res: Response) {
    try {
      const accountDetails = await AccountDetailsService.getAccountDetailsById(req.params.accId);
      if (accountDetails) {
        res.json(accountDetails);
      } else {
        res.status(404).json({ error: 'Account details not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Unable to retrieve account details' });
    }
  }

  async getAccountDetailUsinguserId(req: Request, res: Response) {
    try {
      const accountDetails = await AccountDetailsService.getAccountDetailsByuserId(req.params.userId);
      if (accountDetails) {
        res.json(accountDetails);
      } else {
        res.status(404).json({ error: 'Account details not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Unable to retrieve account details' });
    }
  }

  async updateAccountDetails(req: Request, res: Response) {
    try {
      const updated = await AccountDetailsService.updateAccountDetails(req.params.accId, req.body);
      res.json({ message: 'Account details updated', updated });
    } catch (error) {
      res.status(400).json({ error: 'Unable to update account details' });
    }
  }

  async deleteAccountDetails(req: Request, res: Response) {
    try {
      await AccountDetailsService.deleteAccountDetails(req.params.accId);
      res.json({ message: 'Account details deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Unable to delete account details' });
    }
  }
}

export default new AccountDetailsController();

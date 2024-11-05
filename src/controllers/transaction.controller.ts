import { Request, Response } from 'express';
import TransactionService from '../services/transaction.service';

class TransactionController {
  async create(req: Request, res: Response) {
    try {
      const transaction = await TransactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTransactionByTrancId(req: Request, res: Response) {
    try {
      const transaction = await TransactionService.getTransactionById(parseInt(req.params.transId));
      if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
      res.status(200).json(transaction);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTransactionByUserId(req: Request, res: Response) {
    try {
      const transaction = await TransactionService.getTransactionByUserId(req.params.userId);
      if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
      res.status(200).json(transaction);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const transactions = await TransactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedTransaction = await TransactionService.updateTransaction(parseInt(req.params.transId), req.body);
      res.status(200).json(updatedTransaction);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await TransactionService.deleteTransaction(parseInt(req.params.transId));
      res.status(200).json(result);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TransactionController();

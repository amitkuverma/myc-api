import { Request, Response } from 'express';
import PaymentService from '../services/payment.service';

class PaymentController {
  // Create a new payment
  async createPayment(req: Request, res: Response) {
    try {
      // Create new payment
      const newPayment = await PaymentService.createPayment(req.body);

      return res.status(201).json({
        message: 'Payment created successfully',
        payment: newPayment,
      });
    } catch (error: any) {
      return res.status(500).json({ message: 'Failed to create payment', error: error.message });
    }
  }

  // Update an existing payment
  async updatePayment(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      // Ensure that the payment exists before attempting to update
      const existingPayment = await PaymentService.findPaymentById(userId);
      if (!existingPayment) {
        return res.status(404).json({
          message: 'Payment not found for this user. Use create endpoint instead.',
        });
      }

      // Update payment
      const updatedPayment = await PaymentService.updatePayment(req.body);

      return res.status(200).json({
        message: 'Payment updated successfully',
        payment: updatedPayment,
      });
    } catch (error: any) {
      return res.status(500).json({ message: 'Failed to update payment', error: error.message });
    }
  }

  // Retrieve payments for a specific user by user ID
  async getPaymentsByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const payments = await PaymentService.findPaymentByUserId(userId);
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
    }
  }

  async getPaymentsByPayId(req: Request, res: Response) {
    const { payId } = req.params;
    try {
      const payments = await PaymentService.findPaymentById(payId);
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
    }
  }

  // Retrieve all payments
  async getAllUserPayments(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getPaymentList();
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
    }
  }

  async deletePaymentDetails(req: Request, res: Response) {
    try {
      await PaymentService.deletePayment(req.params.userId);
      res.status(200).json({ message: 'Payment details deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete account details' });
    }
  }
}

export default new PaymentController();

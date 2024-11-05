import Payment from '../models/user/payment.model';

class PaymentService {
  async findPaymentByUserId(userId: any) {
    const payment = await Payment.findOne({ where: { userId }});
    if (!payment) {
      throw new Error('User data not found in payment table');
    }
    return payment;
  }

  async findPaymentById(payId: any) {
    const payment = await Payment.findByPk(payId);
    if (!payment) {
      throw new Error('User data not found in payment table');
    }
    return payment;
  }

  async getPaymentList() {
    return await Payment.findAll();
  }

  async createPayment(data:any) {
    return await Payment.create(data);
  }

  async updatePayment(updateData: Partial<Payment>) {
    const payment = await Payment.findByPk(updateData.payId);

    if (!payment) {
      throw new Error('Payment not found');
    }

    return await payment.update(updateData);
  }

  async deletePayment(payId: any) {
    return Payment.destroy({ where: { payId: payId } });
  }
}

export default new PaymentService();

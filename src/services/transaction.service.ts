import Transaction from '../models/user/transaction.model';

class TransactionService {
  async createTransaction(data: any) {
    return Transaction.create(data);
  }

  async getTransactionById(transId: any) {
    return Transaction.findOne({ where: { transId: transId } });
  }

  async getTransactionByUserId(userId: any) {
    return Transaction.findAll({ where: { userId: userId } });
  }

  async getAllTransactions() {
    return Transaction.findAll();
  }

  async updateTransaction(transId: number, data: any) {
    const transaction = await Transaction.findByPk(transId);
    if (!transaction) throw new Error('Transaction not found');
    return transaction.update(data);
  }

  async deleteTransaction(transId: number) {
    const transaction = await Transaction.findByPk(transId);
    if (!transaction) throw new Error('Transaction not found');
    await transaction.destroy();
    return { message: 'Transaction deleted successfully' };
  }
}

export default new TransactionService();

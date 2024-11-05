import AccountDetails from '../models/user/account.model';

class AccountDetailsService {
  async createAccountDetails(data: any) {
    return AccountDetails.create(data);
  }

  async getAllAccountDetails() {
    return AccountDetails.findAll();
  }

  async getAccountDetailsById(accId: any) {
    return AccountDetails.findByPk(accId);
  }

  async getAccountDetailsByuserId(userId: any) {
    return AccountDetails.findOne({ where: { userId: userId } });
  }

  async updateAccountDetails(accId: any, data: any) {
    return AccountDetails.update(data, { where: { accId: accId } });
  }

  async deleteAccountDetails(accId: any) {
    return AccountDetails.destroy({ where: { accId: accId } });
  }
}

export default new AccountDetailsService();

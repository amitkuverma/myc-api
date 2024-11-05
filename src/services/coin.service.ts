import Coin from '../models/user/coin.model';

class CoinService {
  // Create a new coin
  async createCoin(data: any) {
    return Coin.create(data);
  }

  // Get all coins
  async getAllCoins() {
    return Coin.findAll();
  }

  // Get coin by ID
  async getCoinById(id: number) {
    return Coin.findByPk(id);
  }

  // Update a coin by ID
  async updateCoin(id: number, data: any) {
    const coin = await Coin.findByPk(id);
    if (coin) {
      return coin.update(data);
    }
    throw new Error('Coin not found');
  }

  // Delete a coin by ID
  async deleteCoin(id: number) {
    const coin = await Coin.findByPk(id);
    if (coin) {
      await coin.destroy();
      return { message: 'Coin deleted successfully' };
    }
    throw new Error('Coin not found');
  }
}

export default new CoinService();

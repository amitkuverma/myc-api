import { Request, Response } from 'express';
import CoinService from '../services/coin.service';

class CoinController {
  // Create a new coin
  async createCoin(req: Request, res: Response) {
    try {
      const coin = await CoinService.createCoin(req.body);
      res.status(201).json(coin);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all coins
  async getAllCoins(req: Request, res: Response) {
    try {
      const coins = await CoinService.getAllCoins();
      res.status(200).json(coins);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get coin by ID
  async getCoinById(req: Request, res: Response) {
    try {
      const coin = await CoinService.getCoinById(parseInt(req.params.id));
      if (coin) {
        res.status(200).json(coin);
      } else {
        res.status(404).json({ message: 'Coin not found' });
      }
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update coin
  async updateCoin(req: Request, res: Response) {
    try {
      const coin = await CoinService.updateCoin(parseInt(req.params.id), req.body);
      res.status(200).json(coin);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete coin
  async deleteCoin(req: Request, res: Response) {
    try {
      await CoinService.deleteCoin(parseInt(req.params.id));
      res.status(200).json({ message: 'Coin deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CoinController();

import { Router } from 'express';
import CoinController from '../controllers/coin.controller';

const coinRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Coins
 *   description: Coin management API
 */

/**
 * @swagger
 * /api/coins:
 *   get:
 *     summary: Get all coins
 *     tags: [Coins]
 *     responses:
 *       200:
 *         description: List of coins.
 */
coinRouter.get('/coins', CoinController.getAllCoins);

/**
 * @swagger
 * /api/coin/{id}:
 *   get:
 *     summary: Get a coin by ID
 *     tags: [Coins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The coin ID
 *     responses:
 *       200:
 *         description: Coin object.
 *       404:
 *         description: Coin not found.
 */
coinRouter.get('/coin/:id', CoinController.getCoinById);

/**
 * @swagger
 * /api/coins:
 *   post:
 *     summary: Create a new coin
 *     tags: [Coins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coinRate
 *               - coinType
 *             properties:
 *               coinRate:
 *                 type: number
 *               coinType:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created coin.
 */
coinRouter.post('/coins', CoinController.createCoin);

/**
 * @swagger
 * /api/coin/{id}:
 *   put:
 *     summary: Update a coin by ID
 *     tags: [Coins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The coin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated coin.
 *       404:
 *         description: Coin not found.
 */
coinRouter.put('/coin/:id', CoinController.updateCoin);

/**
 * @swagger
 * /api/coin/{id}:
 *   delete:
 *     summary: Delete a coin by ID
 *     tags: [Coins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The coin ID
 *     responses:
 *       200:
 *         description: Coin deleted.
 *       404:
 *         description: Coin not found.
 */
coinRouter.delete('/coin/:id', CoinController.deleteCoin);

export default coinRouter;

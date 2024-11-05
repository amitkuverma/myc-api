import express from 'express';
import {
  createDailyEarning,
  getAllDailyEarnings,
  getDailyEarningById,
  getDailyEarningsByUserId,
  updateDailyEarning,
  deleteDailyEarning
} from '../controllers/dailyEarning.controller';

const dailyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: DailyEarnings
 *   description: API for managing daily earnings
 */

/**
 * @swagger
 * /api/daily-earnings:
 *   get:
 *     summary: Get all daily earnings
 *     tags: [DailyEarnings]
 *     responses:
 *       200:
 *         description: List of daily earnings
 */
dailyRouter.get('/daily-earnings', getAllDailyEarnings);

/**
 * @swagger
 * /api/daily-earnings/{id}:
 *   get:
 *     summary: Get a daily earning by ID
 *     tags: [DailyEarnings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The daily earning ID
 *     responses:
 *       200:
 *         description: Daily earning data
 */
dailyRouter.get('/daily-earnings/:id', getDailyEarningById);

/**
 * @swagger
 * /api/daily-earnings/user/{userId}:
 *   get:
 *     summary: Get daily earnings by userId
 *     tags: [DailyEarnings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of daily earnings for the specified user
 *       404:
 *         description: No daily earnings found for this user
 */
dailyRouter.get('/daily-earnings/user/:userId', getDailyEarningsByUserId);


/**
 * @swagger
 * /api/daily-earnings:
 *   post:
 *     summary: Create a new daily earning entry
 *     tags: [DailyEarnings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               userName:
 *                 type: string
 *               dailyEarning:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Daily earning created
 */
dailyRouter.post('/daily-earnings', createDailyEarning);

/**
 * @swagger
 * /api/daily-earnings/{id}:
 *   put:
 *     summary: Update a daily earning entry
 *     tags: [DailyEarnings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The daily earning ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dailyEarning:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Daily earning updated
 */
dailyRouter.put('/daily-earnings/:id', updateDailyEarning);

/**
 * @swagger
 * /api/daily-earnings/{id}:
 *   delete:
 *     summary: Delete a daily earning entry
 *     tags: [DailyEarnings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The daily earning ID
 *     responses:
 *       204:
 *         description: Daily earning deleted
 */
dailyRouter.delete('/daily-earnings/:id', deleteDailyEarning);

export default dailyRouter;

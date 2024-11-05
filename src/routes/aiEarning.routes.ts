import express from 'express';
import {
  createAiEarning,
  getAllAiEarnings,
  getAiEarningById,
  getAiEarningsByUserId,
  updateAiEarning,
  deleteAiEarning
} from '../controllers/aiEarning.controller';

const aiRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: AiEarnings
 *   description: API for managing AI earnings
 */

/**
 * @swagger
 * /api/ai-earnings:
 *   get:
 *     summary: Get all AI earnings
 *     tags: [AiEarnings]
 *     responses:
 *       200:
 *         description: List of AI earnings
 */
aiRouter.get('/ai-earnings', getAllAiEarnings);

/**
 * @swagger
 * /api/ai-earnings/{id}:
 *   get:
 *     summary: Get an AI earning by ID
 *     tags: [AiEarnings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The AI earning ID
 *     responses:
 *       200:
 *         description: AI earning data
 */
aiRouter.get('/ai-earnings/:id', getAiEarningById);

/**
 * @swagger
 * /api/ai-earnings/user/{userId}:
 *   get:
 *     summary: Get AI earnings by userId
 *     tags: [AiEarnings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of AI earnings for the specified user
 *       404:
 *         description: No AI earnings found for this user
 *       500:
 *         description: Error retrieving AI earnings by userId
 */
aiRouter.get('/ai-earnings/user/:userId', getAiEarningsByUserId);

/**
 * @swagger
 * /api/ai-earnings:
 *   post:
 *     summary: Create a new AI earning entry
 *     tags: [AiEarnings]
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
 *               aiEarning:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: AI earning created
 */
aiRouter.post('/ai-earnings', createAiEarning);

/**
 * @swagger
 * /api/ai-earnings/{id}:
 *   put:
 *     summary: Update an AI earning entry
 *     tags: [AiEarnings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The AI earning ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aiEarning:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI earning updated
 */
aiRouter.put('/ai-earnings/:id', updateAiEarning);

/**
 * @swagger
 * /api/ai-earnings/{id}:
 *   delete:
 *     summary: Delete an AI earning entry
 *     tags: [AiEarnings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The AI earning ID
 *     responses:
 *       204:
 *         description: AI earning deleted
 */
aiRouter.delete('/ai-earnings/:id', deleteAiEarning);

export default aiRouter;

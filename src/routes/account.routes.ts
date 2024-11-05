import { Router } from 'express';
import AccountDetailsController from '../controllers/account.controller';
import { authenticateToken } from '../middlewares/auth';

const accRouter = Router();

/**
 * @swagger
 * /api/account:
 *   post:
 *     summary: Create account details
 *     tags: [AccountDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accId:
 *                 type: integer
 *               bankName:
 *                 type: string
 *               branchName:
 *                 type: string
 *               accountType:
 *                 type: string
 *               accountHolderName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               ifscCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account details created successfully
 *       400:
 *         description: Bad Request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
accRouter.post('/account', authenticateToken, AccountDetailsController.createAccountDetails);

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Retrieve all user account details
 *     tags: [AccountDetails]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved account details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   accId:
 *                     type: integer
 *                   bankName:
 *                     type: string
 *                   branchName:
 *                     type: string
 *                   accountType:
 *                     type: string
 *                   accountHolderName:
 *                     type: string
 *                   accountNumber:
 *                     type: string
 *                   ifscCode:
 *                     type: string
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       404:
 *         description: Account details not found
 *       500:
 *         description: Internal server error
 */
accRouter.get('/account', authenticateToken, AccountDetailsController.getAllAccountDetails);

/**
 * @swagger
 * /api/account/{accId}:
 *   get:
 *     summary: Get account details by account ID
 *     tags: [AccountDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID for which the account details are retrieved
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *       404:
 *         description: Account details not found
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
accRouter.get('/account/:accId', authenticateToken, AccountDetailsController.getAccountDetails);

/**
 * @swagger
 * /api/account/{userId}:
 *   get:
 *     summary: Get account details by user ID
 *     tags: [AccountDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID for which the account details are retrieved
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *       404:
 *         description: Account details not found
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
accRouter.get('/account/:userId', authenticateToken, AccountDetailsController.getAccountDetailUsinguserId);

/**
 * @swagger
 * /api/account/{accId}:
 *   put:
 *     summary: Update account details by account ID
 *     tags: [AccountDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID for which the account details are updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankName:
 *                 type: string
 *               branchName:
 *                 type: string
 *               accountType:
 *                 type: string
 *               accountHolderName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               ifscCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account details updated successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Account details not found
 */
accRouter.put('/account/:accId', authenticateToken, AccountDetailsController.updateAccountDetails);

/**
 * @swagger
 * /api/account/{accId}:
 *   delete:
 *     summary: Delete account details by account ID
 *     tags: [AccountDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID for which the account details are deleted
 *     responses:
 *       200:
 *         description: Account details deleted successfully
 *       400:
 *         description: Bad Request - Unable to delete account details
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Account details not found
 */
accRouter.delete('/account/:accId', authenticateToken, AccountDetailsController.deleteAccountDetails);

export default accRouter;

import { Router } from 'express';
import PaymentController from '../controllers/payment.controller';
import { authenticateToken } from '../middlewares/auth';

const paymentRouter = Router();


/**
 * @swagger
 * /api/payment/{userId}:
 *   get:
 *     summary: Get all payments for a specific user
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to retrieve payments for
 *     responses:
 *       200:
 *         description: Successfully retrieved payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   earnAmount:
 *                     type: number
 *                   totalAmount:
 *                     type: number
 *                   paymentMethod:
 *                     type: string
 *                   transactionId:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Failed to retrieve payments
 */
paymentRouter.get('/payment/:userId', authenticateToken, PaymentController.getPaymentsByUserId);

/**
 * @swagger
 * /api/payment/{payId}:
 *   get:
 *     summary: Get payments for a specific user by payId
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to retrieve payments for
 *     responses:
 *       200:
 *         description: Successfully retrieved payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   earnAmount:
 *                     type: number
 *                   totalAmount:
 *                     type: number
 *                   paymentMethod:
 *                     type: string
 *                   transactionId:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Failed to retrieve payments
 */
paymentRouter.get('/payment/:payId', authenticateToken, PaymentController.getPaymentsByPayId);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all user payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   earnAmount:
 *                     type: number
 *                   totalAmount:
 *                     type: number
 *                   paymentMethod:
 *                     type: string
 *                   transactionId:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [completed, pending, failed]
 *       500:
 *         description: Failed to retrieve payments
 */
paymentRouter.get('/payments', authenticateToken, PaymentController.getAllUserPayments);

/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               earnAmount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               transactionId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Payment already exists
 *       500:
 *         description: Failed to create payment
 */
paymentRouter.post('/payment', authenticateToken, PaymentController.createPayment);

/**
 * @swagger
 * /api/payment/{userId}:
 *   put:
 *     summary: Update an existing payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               earnAmount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               transactionId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to update payment
 */
paymentRouter.put('/payment/:userId', authenticateToken, PaymentController.updatePayment);

/**
 * @swagger
 * /api/payment/{userId}:
 *   delete:
 *     summary: Delete account details by user ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
paymentRouter.delete('/account/:userId', authenticateToken, PaymentController.deletePaymentDetails);

export default paymentRouter;

import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management API
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Log in a user and return a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *       401:
 *         description: Invalid credentials.
 */
authRouter.post('/login', AuthController.login);

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Initiates a password reset
 *     description: Sends a password reset email with a token if the email is registered.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's registered email address
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       404:
 *         description: User not found
 */
authRouter.post('/forgot-password', AuthController.forgotPassword);

/**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: Completes password reset with a new password
 *     description: Resets the user password if the provided token is valid.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User's unique identifier
 *                 example: 1
 *               token:
 *                 type: string
 *                 description: Reset token sent via email
 *                 example: abcdef123456
 *               newPassword:
 *                 type: string
 *                 description: New password to replace the old one
 *                 example: NewStrongPassword!123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
authRouter.post('/reset-password', AuthController.resetPassword);






export default authRouter;

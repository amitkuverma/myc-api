import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []  # This adds the Bearer token requirement (LOCK)
 *     description: Retrieve a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *                   isAdmin:
 *                     type: boolean
 *                     description: Whether the user is an admin.
 */
router.get('/users', authenticateToken, UserController.getAllUsers);

/**
 * @openapi
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []  # This adds the Bearer token requirement (LOCK)
 *     description: Retrieve a user by their ID from the database.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                 mobile:
 *                   type: string
 *                   description: The user's mobile number.
 *                 status:
 *                   type: string
 *                   description: The user's status.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.get('/user/:userId', authenticateToken, UserController.getUserById);

/**
 * @openapi
 * /api/user/{userId}/status:
 *   put:
 *     summary: Update user status
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []  # This adds the Bearer token requirement (LOCK)
 *     description: Update the status of a user by their ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the user.
 *     responses:
 *       200:
 *         description: User status updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID.
 *                 status:
 *                   type: string
 *                   description: The updated status.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.put('/user/:userId/status', authenticateToken, UserController.updateUserStatus);

/**
 * @openapi
 * /api/user/{userId}:
 *   put:
 *     summary: Update user status
 *     security:
 *       - BearerAuth: []  # This adds the Bearer token requirement (LOCK)
 *     description: Update the status of a user by their ID.
 *     tags:
 *      - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the user.
 *     responses:
 *       200:
 *         description: User status updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID.
 *                 status:
 *                   type: string
 *                   description: The updated status.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.put('/user/:userId', UserController.updateUser);

/**
 * @openapi
 * /api/register/{referralCode}:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by providing the necessary details. Optionally, a referral code can be provided.
 *     tags: [Users]
 *     parameters:
 *       - name: referralCode
 *         in: path
 *         required: false
 *         description: An optional referral code from another user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                 referralCode:
 *                   type: string
 *                   description: The generated referral code for the new user.
 *                 otp:
 *                   type: string
 *                   description: OTP sent for mobile verification.
 *       400:
 *         description: Bad request.
 */
router.post('/register/:referralCode?', UserController.createUser);

/**
 * @swagger
 * /api/delete/{userId}:
 *   delete:
 *     summary: Delete a user profile and their referrals
 *     description: Deletes the specified user and all referrals made by them.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User and their referrals successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User and referrals deleted successfully
 *       404:
 *         description: User or referrals not found
 *       500:
 *         description: Server error
 */

// API to get all the referrals made by a user
router.delete('/delete/:userId', authenticateToken, UserController.deleteUserProfile);

export default router;

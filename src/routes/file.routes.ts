import express from 'express';
import { upload, uploadFile } from '../controllers/file.controller';

const fileRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management API
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server.
 *     tags: [File]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file  // Ensure this matches the field name expected by multer
 *         type: file
 *         required: true
 *         description: The file to upload.
 *       - in: formData
 *         name: id
 *         type: string
 *         required: true
 *         description: The ID of the user, payment, or transaction.
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true
 *         description: The type of upload (user, payment, or transaction).
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *       400:
 *         description: No file uploaded or validation error.
 *       404:
 *         description: Record not found.
 *       500:
 *         description: Error updating file details in the database.
 */
fileRouter.post('/upload', upload, uploadFile); // Apply the upload middleware here

export default fileRouter;

import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import User from '../models/user/user.model';
import Transaction from '../models/user/transaction.model';
import paymentService from '../services/payment.service';

const uploadsPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath); // Specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
    }
});

const upload = multer({ storage }).single('file'); // Ensure you specify 'file' as the field name

// Upload file controller
const uploadFile = async (req: Request, res: Response) => {
    // Check for uploaded file
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { id, type } = req.body; // Get userId and type from the request body

    // Validate userId and type
    if (!id || !type) {
        return res.status(400).json({ message: 'User ID and type are required.' });
    }

    try {
        // Prepare updated file details
        const updatedFileDetails = {
            filename: req.file.originalname,
            filepath: req.file.path.replace(/^.*[\\\/]uploads[\\\/]/, 'uploads/'), // Use absolute path for the file
            mimetype: req.file.mimetype,
        };
        
        let record;

        // Find and update the record based on type
        switch (type) {
            case 'user':
                record = await User.findByPk(id);
                if (!record) return res.status(404).json({ message: 'User record not found.' });
                break;
            case 'payment':
                record = await paymentService.findPaymentByUserId(id);
                if (!record) return res.status(404).json({ message: 'Payment record not found.' });
                break;
            case 'transaction':
                record = await Transaction.findByPk(id);
                if (!record) return res.status(404).json({ message: 'Transaction record not found.' });
                break;
            default:
                return res.status(400).json({ message: 'Invalid type provided.' });
        }

        // Update record details
        Object.assign(record, updatedFileDetails);
        await record.save();

        return res.status(200).json({
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} file updated successfully.`,
            file: record,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error updating file details in the database.', error });
    }
};

export { upload, uploadFile };

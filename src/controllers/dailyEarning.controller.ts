import { Request, Response } from 'express';
import DailyEarning from '../models/user/daily-earning.model';

// Create a new DailyEarning entry
export const createDailyEarning = async (req: Request, res: Response) => {
    try {
        const { userId, userName, dailyEarning, status } = req.body;
        const newDailyEarning = await DailyEarning.create({ userId, userName, dailyEarning, status });
        res.status(201).json(newDailyEarning);
    } catch (error) {
        res.status(500).json({ message: 'Error creating daily earning entry', error });
    }
};

// Retrieve all DailyEarning entries
export const getAllDailyEarnings = async (req: Request, res: Response) => {
    try {
        const dailyEarnings = await DailyEarning.findAll();
        res.status(200).json(dailyEarnings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving daily earnings', error });
    }
};

// Retrieve a single DailyEarning entry by ID
export const getDailyEarningById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dailyEarning = await DailyEarning.findByPk(id);
        if (!dailyEarning) return res.status(404).json({ message: 'Daily earning not found' });
        res.status(200).json(dailyEarning);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving daily earning', error });
    }
};

export const getDailyEarningsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const dailyEarnings = await DailyEarning.findAll({ where: { userId } });
        if (dailyEarnings.length === 0) {
            return res.status(404).json({ message: 'No daily earnings found for this user' });
        }
        res.status(200).json(dailyEarnings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving daily earnings by userId', error });
    }
};

// Update a DailyEarning entry
export const updateDailyEarning = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await DailyEarning.update(req.body, { where: { dailyId: id } });
        if (!updated) return res.status(404).json({ message: 'Daily earning not found' });
        const updatedDailyEarning = await DailyEarning.findByPk(id);
        res.status(200).json(updatedDailyEarning);
    } catch (error) {
        res.status(500).json({ message: 'Error updating daily earning', error });
    }
};

// Delete a DailyEarning entry
export const deleteDailyEarning = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await DailyEarning.destroy({ where: { dailyId: id } });
        if (!deleted) return res.status(404).json({ message: 'Daily earning not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting daily earning', error });
    }
};

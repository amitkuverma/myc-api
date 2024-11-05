import { Request, Response } from 'express';
import AiEarning from '../models/user/ai-earning.model';

// Create a new AiEarning entry
export const createAiEarning = async (req: Request, res: Response) => {
    try {
        const { userId, userName, aiEarning, status } = req.body;
        const newAiEarning = await AiEarning.create({ userId, userName, aiEarning, status });
        res.status(201).json(newAiEarning);
    } catch (error) {
        res.status(500).json({ message: 'Error creating AI earning entry', error });
    }
};

// Retrieve all AiEarning entries
export const getAllAiEarnings = async (req: Request, res: Response) => {
    try {
        const aiEarnings = await AiEarning.findAll();
        res.status(200).json(aiEarnings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving AI earnings', error });
    }
};

// Retrieve a single AiEarning entry by ID
export const getAiEarningById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const aiEarning = await AiEarning.findByPk(id);
        if (!aiEarning) return res.status(404).json({ message: 'AI earning not found' });
        res.status(200).json(aiEarning);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving AI earning', error });
    }
};

export const getAiEarningsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const aiEarnings = await AiEarning.findAll({ where: { userId } });
        if (aiEarnings.length === 0) {
            return res.status(404).json({ message: 'No AI earnings found for this user' });
        }
        res.status(200).json(aiEarnings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving AI earnings by userId', error });
    }
};

// Update an AiEarning entry
export const updateAiEarning = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await AiEarning.update(req.body, { where: { aiId: id } });
        if (!updated) return res.status(404).json({ message: 'AI earning not found' });
        const updatedAiEarning = await AiEarning.findByPk(id);
        res.status(200).json(updatedAiEarning);
    } catch (error) {
        res.status(500).json({ message: 'Error updating AI earning', error });
    }
};

// Delete an AiEarning entry
export const deleteAiEarning = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await AiEarning.destroy({ where: { aiId: id } });
        if (!deleted) return res.status(404).json({ message: 'AI earning not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting AI earning', error });
    }
};

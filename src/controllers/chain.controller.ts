import { Request, Response } from 'express';
import ChainService from '../services/chain.service';

export default class ChainController {

    static async getReferralTree(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const referralChain = await ChainService.getTreeLengthFromChildUserId(userId);

            if (!referralChain) {
                return res.status(404).json({ message: "No referral chain found" });
            }

            res.status(200).json(referralChain);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching referral chain", error: error.message });
        }
    }

    static async getReferralChain(req: Request, res: Response) {
        try {
            const { userId } = req.params; // Get the userId from request params
            const referralChain = await ChainService.getReferralChain(userId);

            if (!referralChain.length) {
                return res.status(404).json({ message: "No referral chain found" });
            }

            res.status(200).json(referralChain);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching referral chain", error: error.message });
        }
    }

    static async getUserReferralChainList(req: Request, res: Response) {
        try {
            const { userId } = req.params; // Get the userId from request params
            const referralChain = await ChainService.getUserReferralChainList(userId);

            if (!referralChain) {
                return res.status(404).json({ message: "No referral chain found" });
            }

            res.status(200).json(referralChain);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching referral chain", error: error.message });
        }
    }

    // Optional: API to get the referrals made by a user
    static async getReferralParent(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const referralChildren = await ChainService.getUserParentChain(userId);

            res.status(200).json(referralChildren);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching referral children", error: error.message });
        }
    }

    static async getChildDataByParentId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const referralChildren = await ChainService.getChildDataByParentId(userId);

            res.status(200).json(referralChildren);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching referral children", error: error.message });
        }
    }

    // Optional: API to get the referrals made by a user
    static async getReferralChildren(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const referralChildren = await ChainService.getReferralChildrenTaskCompleted(userId);

            res.status(200).json(referralChildren);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching referral children", error: error.message });
        }
    }

}

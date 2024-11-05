import Payment from '../models/user/payment.model';
import User from '../models/user/user.model';
import { hashPassword } from '../utils/authUtils';
import PaymentService from '../services/payment.service';
import { where } from 'sequelize';

interface UserRegistrationData {
    name: string;
    email: string;
    mobile: string;
    password: string;
    referralCode?: string;
}

export default class ChainService {

    static async getReferralChain(userId: any): Promise<{ user: User; referrals: User[] }[]> {
        const referralChain: { user: User; referrals: User[] }[] = [];
        let currentUser: any = await User.findByPk(userId);

        while (currentUser) {
            const referrals = await User.findAll({
                where: { parentUserId: currentUser.userId }
            });

            referralChain.push({ user: currentUser, referrals });

            currentUser = referrals.length > 0 ? referrals[0] : null;
        }

        return referralChain;
    }

    static async getTreeLengthFromChildUserId(userId: any): Promise<{ user: User | null; chain: User[] }> {
        async function fetchParentChain(currentUser: User | null, chain: User[] = []): Promise<User[]> {
            if (!currentUser) return chain;

            // Add current user to the chain
            chain.push(currentUser);

            // Find the parent user
            const parentUser = await User.findOne({
                where: { userId: currentUser.parentUserId },
                attributes: ['userId', 'name', 'email', 'mobile', 'emailVerified', 'referralCode', 'createdAt', 'status', 'filepath', 'filename', 'parentUserId'],
            });

            // Recurse upwards to find the full parent chain
            return fetchParentChain(parentUser, chain);
        }

        // Start with the initial user and fetch the chain upwards
        const initialUser = await User.findByPk(userId, {
            attributes: ['userId', 'name', 'email', 'mobile', 'emailVerified', 'referralCode', 'createdAt', 'status', 'filepath', 'filename', 'parentUserId'],
        });

        // If initialUser is null, return an empty chain
        if (!initialUser) {
            return { user: null, chain: [] };
        }

        const chain = await fetchParentChain(initialUser);
        return { user: initialUser, chain };
    }


    static async getUserReferralChainList(userId: any): Promise<{ user: User | null; referrals: User[] }> {
        async function fetchChain(currentUser: User | null): Promise<{ user: User; referrals: User[] }> {
            if (!currentUser) {
                // Return a valid structure even when the user is null
                return { user: {} as User, referrals: [] }; // Return an empty User object as a placeholder
            }

            const referrals: User[] = await User.findAll({
                where: { parentUserId: currentUser.userId }
            });

            // Fetch referral chains for each referral and flatten the results
            const referralChains = await Promise.all(referrals.map(fetchChain));

            // Flatten the referral chains into a single array
            const allReferrals: User[] = referralChains.reduce((acc, chain) => {
                acc.push(chain.user); // Add the current user to the flat array
                return acc.concat(chain.referrals); // Concatenate the nested referrals
            }, [] as User[]);

            return { user: currentUser, referrals: allReferrals };
        }

        const initialUser: User | null = await User.findByPk(userId);
        return await fetchChain(initialUser);
    }

    static async getUserParentChain(userId: any): Promise<User[]> {
        const parents: User[] = [];

        let currentUser = await User.findByPk(userId);
        while (currentUser && currentUser.parentUserId) {
            parents.push(currentUser);
            currentUser = await User.findByPk(currentUser.parentUserId);
        }

        // Push the root user (who has no parent) if they exist
        if (currentUser) {
            parents.push(currentUser);
        }

        return parents;
    }

    static async getChildDataByParentId(userId: any): Promise<{ user: User; level: number; children: any[]; countAtLevel: number }[]> {
        const result: { user: User; level: number; children: any[]; countAtLevel: number }[] = [];
        const levelCounts: { [key: number]: number } = {}; // Store counts per level
        
        async function fetchChildUsers(userId: any, level: number): Promise<any> {
            // Find direct children of the given userId
            const childUsers = await User.findAll({ where: { parentUserId: userId } });
            
            // If there are users at this level, increment the count; otherwise, initialize it
            levelCounts[level] = (levelCounts[level] || 0) + childUsers.length;
            
            const children = [];
            for (const child of childUsers) {
                // Recursively fetch children for each child
                const childData = await fetchChildUsers(child.userId, level + 1);
                children.push({
                    user: child,
                    level,
                    children: childData.children,
                    countAtLevel: levelCounts[level] // Store the count for this level
                });
            }
            
            return { children };
        }
        
        // Start the recursive search from level 0
        const topLevel = await fetchChildUsers(userId, 0);
        result.push(...topLevel.children); // Populate result array with hierarchical data
        
        return result;
    }
    

    // static async getUserReferralChainList(userId: any): Promise<{ user: User; referrals: any[] }> {
    //   async function fetchChain(currentUser: User): Promise<{ user: User; referrals: any[] }> {
    //     if (!currentUser) null;

    //     const referrals = await User.findAll({
    //       where: { parentUserId: currentUser.userId }
    //     });

    //     const referralChain = await Promise.all(referrals.map(async (referral) => await fetchChain(referral)));

    //     return { user: currentUser, referrals: referralChain };
    //   }

    //   const initialUser: any = await User.findByPk(userId);
    //   return await fetchChain(initialUser);
    // }

    static async getReferralChildrenTaskCompleted(userId: any): Promise<{
        user: User | null;
        referrals: any[],
        liveReferralCount: number // Total live referral count
    }> {

        // Helper function to recursively fetch the referral chain and count 'live' status referrals
        async function fetchChain(
            currentUser: User | null
        ): Promise<{
            user: User | null;
            referrals: any[],
            liveReferralCount: number // Track the count of 'live' referrals at this level
        }> {
            if (!currentUser) {
                return { user: null, referrals: [], liveReferralCount: 0 };
            }

            // Fetch immediate referrals for the current user
            const referrals = await User.findAll({
                where: { parentUserId: currentUser.userId }
            });

            // Recursively fetch each referral's chain
            const referralChain = await Promise.all(referrals.map(async (referral) => await fetchChain(referral)));

            // Count only referrals with 'live' status at the current level
            const liveCountAtCurrentLevel = referrals.filter(referral => referral.status === 'live').length;

            // Sum up 'live' referral counts from all nested chains
            const liveReferralCount = liveCountAtCurrentLevel + referralChain.reduce((acc, referral) => acc + referral.liveReferralCount, 0);

            return {
                user: currentUser,
                referrals: referralChain,
                liveReferralCount // Return the count of 'live' status referrals
            };
        }

        // Fetch the initial user to start the chain
        const initialUser: User | null = await User.findByPk(userId);

        if (!initialUser) throw new Error('User not found');

        // Call the recursive function to fetch chain and count 'live' status referrals
        return await fetchChain(initialUser);

    }

}



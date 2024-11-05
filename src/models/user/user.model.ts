import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class User extends Model {
  public userId!: string;
  public name!: string;
  public email!: string;
  public mobile!: string;
  public password!: string;
  public position!: string;
  public totalDirect!: number;
  public activeDirect!: number;
  public totalTeam!: number;
  public activeTeam!: number;
  public filename?: string;
  public filepath?: string;
  public mimetype?: string;
  public referralCode?: string;
  public parentUserId?: string | null; // Change this to string
  public otp?: string;
  public emailVerified!: boolean;
  public status!: string;
  public joiningDate!: Date;
  public activeDate!: Date;
  public resetToken!: string;
  public resetTokenExpiry!: string;
  public isAdmin!: boolean;
}

User.init(
  {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalDirect: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    activeDirect: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    totalTeam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    activeTeam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentUserId: {
      type: DataTypes.STRING, // Change this to STRING to match userId
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
    joiningDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    activeDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    resetToken: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    resetTokenExpiry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      async beforeCreate(user) {
        console.log('BeforeCreate Hook Triggered:', user);
        try {
          // Find the last user in the database based on userId
          const lastUser = await User.findOne({
            order: [['userId', 'DESC']],
          });

          let newIdNumber = 1; // Default to 1 if no users exist
          if (lastUser && lastUser.userId) {
            // Extract numeric part from the last user’s ID (e.g., "AI0001" -> 1)
            const lastIdNumber = parseInt(lastUser.userId.slice(2), 10);
            newIdNumber = lastIdNumber + 1;
          }

          // Format the new `userId` with "AI" prefix and 4-digit zero padding
          user.userId = `AI${newIdNumber.toString().padStart(4, '0')}`;
          console.log(`Generated userId for new user: ${user.userId}`);
        } catch (error) {
          console.error("Error in beforeCreate hook:", error);
          throw error; // Re-throw to prevent creation if there’s an error
        }
      },
    }
  }
);

export default User;

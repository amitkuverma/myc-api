import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from './user.model'; // Ensure the import path is correct

class AccountDetails extends Model {
  public accId!: number;
  public userId!: string; // Change to string if userId is VARCHAR in users
  public userName!: string;
  public bankName!: string;
  public branchName!: string;
  public accountType!: string;
  public accountHolderName!: string;
  public accountNumber!: string;
  public ifscCode!: string;
}

// Initialize the AccountDetails model
AccountDetails.init({
  accId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING, // Change to STRING to match User model if userId is VARCHAR
    allowNull: false,
    references: {
      model: User, // Reference to the User model directly
      key: 'userId',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  branchName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountHolderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ifscCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'AccountDetails',
  tableName: 'account_details',
  timestamps: true, // For createdAt and updatedAt
});

export default AccountDetails;

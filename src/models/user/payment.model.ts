import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class Payment extends Model {
  public payId!: number;
  public userId!: string; // Change to string to match users table
  public userName!: string;
  public earnWallet!: number;
  public depositWallet!: number;
  public referralEarning!: number;
  public selfInvestment!: number;
  public levelEarning!: number;
  public aiEarning!: number;
  public royalty!: number;
  public totalWithdraw!: number;
  public dailyLevelEarning!: number;
  public leadershipEarning!: number;
  public oneTimeEarning!: number;
  public starEarning!: number;
  public totalAmount!: number;
  public plan!: string;
  public commission!: number;
  public planStartDate!: Date; // Change to Date for better typing
  public planEndDate!: Date; // Change to Date for better typing
  public status!: string;
  public filename?: string;
  public filepath?: string;
  public mimetype?: string;
}

Payment.init({
  payId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING, // Changed from INTEGER.UNSIGNED to STRING
    allowNull: false,
    references: {
      model: 'users', // Ensure this matches your users table
      key: 'userId',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  earnWallet: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  depositWallet: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  referralEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  selfInvestment: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  levelEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  aiEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  royalty: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  totalWithdraw: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  dailyLevelEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  leadershipEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  oneTimeEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  starEarning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  plan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  commission: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  planStartDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default
  },
  planEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: true,
});

export default Payment;

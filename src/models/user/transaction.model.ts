import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class Transaction extends Model {
  public transId!: number;
  public userId!: string; // Updated to string
  public userName!: string;
  public receiverName?: string; // Made optional
  public paymentType!: string;
  public transactionId?: string; // Made optional
  public transactionAmount?: string; // Made optional
  public status!: string;
  public filename?: string;
  public filepath?: string;
  public mimetype?: string;
}

Transaction.init({
  transId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING, // Match this with the users table
    allowNull: false,
    references: {
      model: 'users', // Refers to the users table
      key: 'userId',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transactionAmount: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
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
  modelName: 'Transaction',
  tableName: 'transactions',
  timestamps: true, // Optional: if you want createdAt and updatedAt fields
});

export default Transaction;

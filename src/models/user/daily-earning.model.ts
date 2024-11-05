import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from './user.model'; // Ensure the import path is correct

class DailyEarning extends Model {
  public dailyId!: number;
  public userId!: string; // Change to string if userId is VARCHAR in users
  public userName!: string;
  public receiverId!: string; 
  public receiverName!: string;
  public dailyEarning!: string;
  public status!: string;
}

// Initialize the AccountDetails model
DailyEarning.init({
    dailyId: {
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
  receiverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dailyEarning: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'panding'
  },
}, {
  sequelize,
  modelName: 'dailyEarning',
  tableName: 'daily_earnings',
  timestamps: true, // For createdAt and updatedAt
});

export default DailyEarning;

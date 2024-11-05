import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class Coin extends Model {
  public id!: number;
  public coinRate!: number;
  public coinType!: string;
}

Coin.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  coin: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  coinRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  coinType: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Coin',
  tableName: 'coins',
  timestamps: true
});

export default Coin;

import sequelize from '../config/database.js';
import sequelizePkg from 'sequelize';

const { Model, DataTypes } = sequelizePkg;

class Board extends Model {
  declare id: number;
  declare title: string;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Board',
  }
);

export { Board };

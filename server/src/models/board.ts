import sequelize from '../config/database.js';
import sequelizePkg from 'sequelize';
import { User } from './user.js';
import { Column } from './column.js';

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

// Define associations
Board.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Board, {
  foreignKey: 'userId',
  as: 'boards',
});

Board.hasMany(Column, {
  foreignKey: 'boardId',
  as: 'columns',
});

export { Board };

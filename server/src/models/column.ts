import sequelize from '../config/database.js';
import sequelizePkg from 'sequelize';
import { Board } from './board.js';
import { Ticket } from './ticket.js';

const { Model, DataTypes } = sequelizePkg;

class Column extends Model {
  declare id: number;
  declare title: string;
  declare order: number;
  declare boardId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Column.init(
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
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Boards',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Column',
  }
);

// Define associations
Column.belongsTo(Board, {
  foreignKey: 'boardId',
  as: 'board',
});

Column.hasMany(Ticket, {
  foreignKey: 'columnId',
  as: 'tickets',
});

export { Column };

import sequelizePkg from 'sequelize';
import { QueryInterface } from 'sequelize';

const { DataTypes } = sequelizePkg;

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Tickets', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('todo', 'inprogress', 'done'),
        allowNull: false,
        defaultValue: 'todo',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      columnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Columns',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Tickets');
  }
}; 
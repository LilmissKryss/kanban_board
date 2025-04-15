import sequelize from "../config/database.js";
import sequelizePkg from "sequelize";

const { Model, DataTypes } = sequelizePkg;

class Ticket extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare status: "todo" | "inprogress" | "done";
  declare userId: number;
  declare columnId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Ticket.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("todo", "inprogress", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Changed from 'Users' to match the model name
        key: "id",
      },
    },
    columnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Column", // Added reference to Column model
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Ticket",
  }
);

export { Ticket };

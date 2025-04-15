import sequelize from "../config/database.js";
import sequelizePkg from "sequelize";

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
        model: "users", // Reference the actual table name
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Board",
    tableName: "boards", // Explicitly set the table name
  }
);

export { Board };

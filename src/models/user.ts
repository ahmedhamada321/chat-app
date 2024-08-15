import { Model, DataTypes } from "sequelize";
import sequelize from "../connections/db";
import Message from "./message";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: true,
  }
);

// User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
// User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });
export default User;

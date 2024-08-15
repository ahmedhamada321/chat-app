import { Imessage } from "./../api/sockets/index";
import { Model, DataTypes } from "sequelize";
import sequelize from "../connections/db";
import User from "./user";

class Message extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public content!: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Messages",
    timestamps: true,
  }
);

Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });
export default Message;

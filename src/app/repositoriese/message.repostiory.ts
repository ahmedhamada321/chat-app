import { Iuser } from "@/interfaces/user";
import Message from "@/models/message";
import User from "@/models/user";

class MessageRepository {
  async getAlluserMessages({ id }: { id: string }) {
    try {
      const messages = await Message.findAll({
        where: {
          userId: id,
        },
      });
      return messages;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Iuser> {
    try {
      const user = await User.create({ username, password });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateUser({
    username,
    password,
    id,
  }: {
    username: string;
    password: string;
    id: number;
  }): Promise<Iuser> {
    try {
      const user = await User.update(
        { username, password },
        {
          where: {
            id,
          },
        }
      );
      const updatedUser = await User.findByPk(id);
      return updatedUser!;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

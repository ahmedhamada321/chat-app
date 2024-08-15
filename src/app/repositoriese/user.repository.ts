import { Iuser } from "@/interfaces/user";
import User from "@/models/user";

class UserRepository {
  async getAllUsers(): Promise<Iuser[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async userById(id: number): Promise<Iuser | null> {
    try {
      const users = await User.findByPk(id);
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async userByUsername(username: String): Promise<Iuser | null> {
    try {
      const users = await User.findOne({ where: { username: username } });
      return users;
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

export default UserRepository;

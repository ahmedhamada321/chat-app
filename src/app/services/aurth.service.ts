import Jwt from "@/helper/jwt";
import UserRepository from "../repositoriese/user.repository";
import { compare } from "bcrypt";

class authService {
  userRepository = new UserRepository();
  jwt = new Jwt();
  async login(username: string, password: string) {
    const user = await this.userRepository.userByUsername(username);
    if (!user) {
      throw new Error("ueser name or password is incorrect");
    }

    const comparingPassword = await compare(password, user.password);

    if (!comparingPassword) {
      throw new Error("ueser name or password is incorrect");
    }
    ;

    const usernname  =  user.username
  const token=  this.jwt.genneratToken({user.username,user.id});
  }
}

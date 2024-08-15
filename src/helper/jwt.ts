import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class Jwt {
  async genneratToken(data: any) {
    const token = jwt.sign(data, process.env.SECRET_KEY!, { expiresIn: "1h" });
    return token;
  }
  async verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    return decoded;
  }
}

export default Jwt;

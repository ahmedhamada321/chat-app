import http from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import sequelize from "./connections/db";
import User from "./models/user";
import socketHandler from "./api/sockets";
const port = 3200;
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
socketHandler(io);
// app.get("/", (req, res) => {
//   res.json({ message: "hello ya medo !" });
// });
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   socket.on("from", (data) => {
//     // io.emit("to", data);
//     socket.emit("to", {
//       userId: socket.id,
//       message: data.ahmed,
//       timestamp: new Date(),
//     });
//     console.log(`User: ${data.ahmed}, Message: ${socket.id}`); // ��ذن ��لبت محتويات الرسالة للتحقق من الصحة
//   });
//   socket.emit("message", "Welcome to the WebSocket server!"); // إرسال رسالة ترحيبية
// });
app.post("/", async (req: Request, res: Response) => {
  // const { username, password } = req.body;
  // console.log(req);
  try {
    const farstUser = await User.create({
      username: "ahmed",
      password: "123",
    });
    res.json({ message: "this is a farst user in db", farstUser });
  } catch (error: any) {
    res.json({ message: "error  while req", error });
  }
});
const start = async () => {
  try {
    await sequelize.authenticate();
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
start();

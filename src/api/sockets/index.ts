import Message from "../../models/message";
import { Server as SocketIOServer, Socket as SocketIO } from "socket.io";

export interface Imessage {
  content?: string;
  senderID?: number;
  receiverId?: number;
}

const socketHandler = (io: SocketIOServer) => {
  io.use((socket, next) => {
    const token = socket.handshake.headers.authorization;
    socket.data.userId = token;
    next();
  }).on("connection", (socket) => {
    socket.on("getallmessages", async () => {
      const getusermessage: Imessage[] = await Message.findAll({
        attributes: ["content"],
        where: {
          id: socket.data.userId,
        },
      });

      io.emit("usermessages", getusermessage);
    });

    console.log("A user connected");

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User joined group ${groupId}`);
    });

    socket.on("privateMessage", async (messageData) => {
      const { content, receiverId } = messageData;
      const message = await Message.create({
        senderId: socket.data.userId,
        content,
        receiverId,
      });
      socket.to(`user-${receiverId}`).emit("message", message);
    });

    socket.on("newGroupMessage", async (messageData) => {
      const { content, senderId, groupId } = messageData;
      const message = await Message.create({ senderId, content, groupId });
      io.to(groupId).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default socketHandler;

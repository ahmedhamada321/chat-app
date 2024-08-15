"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../../models/message"));
const socketHandler = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.headers.authorization;
        socket.data.userId = token;
        next();
    }).on("connection", (socket) => {
        socket.on("getallmessages", () => __awaiter(void 0, void 0, void 0, function* () {
            const getusermessage = yield message_1.default.findAll({
                attributes: ["content"],
                where: {
                    id: socket.data.userId,
                },
            });
            io.emit("usermessages", getusermessage);
        }));
        console.log("A user connected");
        socket.on("joinGroup", (groupId) => {
            socket.join(groupId);
            console.log(`User joined group ${groupId}`);
        });
        socket.on("privateMessage", (messageData) => __awaiter(void 0, void 0, void 0, function* () {
            const { content, receiverId } = messageData;
            const message = yield message_1.default.create({
                senderId: socket.data.userId,
                content,
                receiverId,
            });
            socket.to(`user-${receiverId}`).emit("message", message);
        }));
        socket.on("newGroupMessage", (messageData) => __awaiter(void 0, void 0, void 0, function* () {
            const { content, senderId, groupId } = messageData;
            const message = yield message_1.default.create({ senderId, content, groupId });
            io.to(groupId).emit("message", message);
        }));
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
exports.default = socketHandler;

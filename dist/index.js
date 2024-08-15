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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./connections/db"));
const user_1 = __importDefault(require("./models/user"));
const sockets_1 = __importDefault(require("./api/sockets"));
const port = 3200;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
(0, sockets_1.default)(io);
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
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { username, password } = req.body;
    // console.log(req);
    try {
        const farstUser = yield user_1.default.create({
            username: "ahmed",
            password: "123",
        });
        res.json({ message: "this is a farst user in db", farstUser });
    }
    catch (error) {
        res.json({ message: "error  while req", error });
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
start();

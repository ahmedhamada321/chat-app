"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = process.env.DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.HOST;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3006;
const dialect = "mysql";
console.log(host, username, database);
// const sequelize = new Sequelize(database, username, "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });
const sequelize = new sequelize_1.Sequelize({
    username,
    database,
    password,
    host,
    dialect,
    port,
});
exports.default = sequelize;

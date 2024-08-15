import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DATABASE;
const username = process.env.DB_USERNAME!;
const password = process.env.DB_PASSWORD;
const host = process.env.HOST;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3006;
const dialect = "mysql";

console.log(host, username, database);

// const sequelize = new Sequelize(database, username, "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

const sequelize = new Sequelize({
  username,
  database,
  password,
  host,
  dialect,
  port,
});
export default sequelize;

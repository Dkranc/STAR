import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

export const db = new Pool({
  host: String(process.env.CONNECT_DB_HOST),
  // host: "star-new2.cb2q7nqhmmpi.us-east-1.rds.amazonaws.com",
  // host:"database-1.crvljuomzzbe.eu-west-1.rds.amazonaws.com",
  user: String(process.env.CONNECT_DB_USER),
  port: Number(process.env.CONNECT_DB_PORT),
  password: String(process.env.CONNECT_DB_PASSWORD),
  //password:"Aa123456",
  database: String(process.env.CONNECT_DB_DATABASE_NAME),

  // host: "star.cpheyh2afxfl.eu-west-1.rds.amazonaws.com",
  // user: "star",
  // password: "vIbw>zZ4Fo+4}K=H",
  // port: "5432",
});

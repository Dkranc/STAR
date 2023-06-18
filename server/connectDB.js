import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  host: "0.0.0.0",
  // host: "star-new2.cb2q7nqhmmpi.us-east-1.rds.amazonaws.com",
  // host:"database-1.crvljuomzzbe.eu-west-1.rds.amazonaws.com",
  user: "postgres",
  port: 5432,
  password: "9511",
  //password:"Aa123456",
  database: "postgres",

  // host: "star.cpheyh2afxfl.eu-west-1.rds.amazonaws.com",
  // user: "star",
  // password: "vIbw>zZ4Fo+4}K=H",
  // port: "5432",
});

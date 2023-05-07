import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  host: "star-new2.cb2q7nqhmmpi.us-east-1.rds.amazonaws.com",
 // host:"database-1.crvljuomzzbe.eu-west-1.rds.amazonaws.com",
  user: "postgres",
  port: 5432,
  password: "password",
  //password:"Aa123456",
  database: "postgres",
});

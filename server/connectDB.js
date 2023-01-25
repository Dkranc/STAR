import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  host: "startest.cb2q7nqhmmpi.us-east-1.rds.amazonaws.com",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "postgres",
});



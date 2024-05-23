import { Pool } from "pg";

const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "postgres",
  password: "pg_password",
  port: 5432,
});

export default pool;

const mysql = require("mysql2/promise");
const { Client } = require("pg");
require("dotenv").config();

async function checkDb() {
  if (process.env.DATABASE_URL) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      console.log("✅ Successfully connected to PostgreSQL!");
      const result = await client.query(
        "SELECT current_database() AS db, current_user AS user;",
      );
      console.log("Connected database:", result.rows[0].db);
      console.log("Connected user:", result.rows[0].user);
      await client.end();
      return;
    } catch (error) {
      console.error("❌ Failed to connect to PostgreSQL:", error.message);
      await client.end().catch(() => {});
      return;
    }
  }

  console.log("Attempting to connect to MySQL as root...");

  const connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
  };

  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log("✅ Successfully connected as root!");

    const [users] = await connection.execute(
      "SELECT user, host FROM mysql.user WHERE user = 'botforge'",
    );
    console.log("Botforge user check:", users);

    const [dbs] = await connection.execute("SHOW DATABASES LIKE 'fogrebot'");
    console.log("Database check:", dbs);

    await connection.end();
  } catch (error) {
    console.error("❌ Failed to connect as root:", error.message);
  }
}

checkDb();

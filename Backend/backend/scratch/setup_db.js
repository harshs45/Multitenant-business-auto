const mysql = require("mysql2/promise");
const { Client } = require("pg");
require("dotenv").config();

async function checkAndFix() {
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  console.log("--- Database Setup Script ---");
  console.log(`Target User: ${dbUser}`);
  console.log(`Target DB:   ${dbName}`);

  if (process.env.DATABASE_URL) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      console.log("✅ Connected to PostgreSQL.");
      const result = await client.query(
        "SELECT current_database() AS db, current_user AS user;",
      );
      console.log("Database:", result.rows[0].db);
      console.log("User:", result.rows[0].user);
      await client.end();
      process.exit(0);
    } catch (err) {
      console.error("❌ FAILED:", err.message);
      await client.end().catch(() => {});
      process.exit(1);
    }
  }

  let connection;

  try {
    console.log("Attempting to connect as root...");
    connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
    });
    console.log("✅ Connected as root.");

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database \`${dbName}\` ensured.`);

    await connection.query(
      `CREATE USER IF NOT EXISTS '${dbUser}'@'localhost' IDENTIFIED BY '${dbPass}';`,
    );
    await connection.query(
      `GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'localhost';`,
    );
    await connection.query(`FLUSH PRIVILEGES;`);
    console.log(`✅ User '${dbUser}' ensured and privileges granted.`);

    await connection.end();
    console.log("--- Setup Complete ---");
    process.exit(0);
  } catch (err) {
    console.error("❌ FAILED:", err.message);
    if (connection) await connection.end().catch(() => {});
    process.exit(1);
  }
}

checkAndFix();

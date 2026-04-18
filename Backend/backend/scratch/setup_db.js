const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkAndFix() {
  const rootPassword = process.env.MYSQL_ROOT_PASSWORD;
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  console.log('--- Database Setup Script ---');
  console.log(`Target User: ${dbUser}`);
  console.log(`Target DB:   ${dbName}`);

  let connection;

  try {
    console.log('Attempting to connect as root...');
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: rootPassword
    });
    console.log('✅ Connected as root.');

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database \`${dbName}\` ensured.`);

    await connection.query(`CREATE USER IF NOT EXISTS '${dbUser}'@'localhost' IDENTIFIED BY '${dbPass}';`);
    await connection.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'localhost';`);
    await connection.query(`FLUSH PRIVILEGES;`);
    console.log(`✅ User '${dbUser}' ensured and privileges granted.`);

    await connection.end();
    console.log('--- Setup Complete ---');
    process.exit(0);
  } catch (err) {
    console.error('❌ FAILED:', err.message);
    if (connection) await connection.end();
    process.exit(1);
  }
}

checkAndFix();

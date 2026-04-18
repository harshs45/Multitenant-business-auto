const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDb() {
  console.log('Attempting to connect to MySQL as root...');
  
  const connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
  };

  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Successfully connected as root!');

    const [users] = await connection.execute("SELECT user, host FROM mysql.user WHERE user = 'botforge'");
    console.log('Botforge user check:', users);

    const [dbs] = await connection.execute("SHOW DATABASES LIKE 'fogrebot'");
    console.log('Database check:', dbs);

    await connection.end();
  } catch (error) {
    console.error('❌ Failed to connect as root:', error.message);
  }
}

checkDb();

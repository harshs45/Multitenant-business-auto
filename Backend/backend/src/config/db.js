require('dotenv').config();

const getDbConfig = (env) => {
  const isProduction = env === 'production';

  return {
    username: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database:
      process.env.DB_NAME ||
      process.env.MYSQLDATABASE ||
      (env === 'test' ? 'botforge_test' : env === 'production' ? 'botforge_prod' : 'botforge_dev'),
    host: process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306', 10),
    dialect: 'mysql',
    logging: env === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
    },
    pool: isProduction
      ? {
          max: 20,
          min: 5,
          acquire: 30000,
          idle: 10000,
        }
      : {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },

    // Enable this only if Railway/MySQL deployment requires SSL
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  };
};

module.exports = {
  development: getDbConfig('development'),
  test: getDbConfig('test'),
  production: getDbConfig('production'),
};
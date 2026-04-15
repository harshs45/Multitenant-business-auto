require('dotenv').config();

const getDbConfig = (env) => {
  const isProduction = env === 'production';

  if (isProduction) {
    return {
      use_env_variable: 'DATABASE_URL',
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
      pool: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };
  }

  return {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'mysql',
    logging: env === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions:
      process.env.DB_SSL === 'true'
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
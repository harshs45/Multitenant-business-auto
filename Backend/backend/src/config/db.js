require("dotenv").config();

const getDbConfig = (env) => {
  const base = {
    logging: env === "development" ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
    },
    pool: {
      max: env === "production" ? 20 : 10,
      min: env === "production" ? 5 : 0,
      acquire: 30000,
      idle: 10000,
    },
  };

  // PostgreSQL (Neon)
  if (process.env.DATABASE_URL) {
    return {
      use_env_variable: "DATABASE_URL",
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      ...base,
    };
  }

  // MySQL (fallback)
  return {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: "mysql",
    ...base,
  };
};

module.exports = {
  development: getDbConfig("development"),
  test: getDbConfig("test"),
  production: getDbConfig("production"),
};

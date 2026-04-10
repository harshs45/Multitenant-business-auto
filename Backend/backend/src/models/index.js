'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db');

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};

console.log('NODE_ENV:', env);

console.log('DB CONFIG CHECK:', {
  database: config.database,
  username: config.username,
  host: config.host,
  port: config.port,
  dialect: config.dialect,
});

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Auto-load every model file except index.js
const modelsDir = __dirname;
fs.readdirSync(modelsDir)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(modelsDir, file))(sequelize);
    db[model.name] = model;
  });

// Run associations
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
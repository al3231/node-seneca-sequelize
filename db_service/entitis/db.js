const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.js')[env];
const chalk = require('chalk');
const initModels = require('../models/init-models');

const { database, username, password, ...options } = config;

const sequelize = new Sequelize(config.database, config.username, config.password, options);

// 验证是否连接成功
sequelize
  .authenticate()
  .then(() => {
    console.log(chalk.green('*****************Connection Mysql Success.************'));
  })
  .catch(err => {
    console.error(chalk.red('***************Connection Mysql Failed.**************', err));
  });

const models = initModels(sequelize);

const db = { ...models };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/index.js')[env].db;
const chalk = require('chalk');
const initModels = require('../models/init-models');
const generateRelation = require('./relation');

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
// 初始化模型
const models = initModels(sequelize);
// 建立模型关系
generateRelation(models);

const db = { ...models };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

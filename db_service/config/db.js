module.exports = {
  // 开发环境数据库配置
  development: {
    username: 'root',
    password: '!!!abc123',
    database: 'zl-test',
    host: '121.36.67.80',
    dialect: 'mysql',
    dialectOptions: {
      charset: "utf8",
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+08:00' //东八时区
  },
  // 生产环境数据库配置
  production: {
    username: 'root',
    password: '!!!abc123',
    database: 'zl-test',
    host: '121.36.67.80',
    dialect: 'mysql',
    dialectOptions: {
      charset: "utf8",
      supportBigNumbers: true,
      bigNumberStrings: true
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+08:00' //东八时区
  }
}
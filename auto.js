const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto(
  'zl-test',     //数据库的库名
  'root',         //mysql数据库的用户名
  '!!!abc123',     //mysql数据库的密码
  {
    host: '121.36.67.80',      // 数据库服务器ip
    dialect: 'mysql',
    directory: './db_service/models',  // prevents the program from writing to disk
    port: '3306',           // 数据库运行端口
    additional: {
      // timestamps: false,
      timestamps: true,
      paranoid: true,
      createdAt: 'createTime',
      updatedAt: 'updateTime',
      deletedAt: 'deleteTime'
    },
    caseModel: 'c',  // 生成列名的驼峰命名规则，mysql to models
    caseFile: 'c', // 生成文件名的驼峰命名规则 table name to file name
    caseProp: 'c',
    lang: 'es6'
  }
)
auto.run(function (err) {
  if (err) throw err;
});

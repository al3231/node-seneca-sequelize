const seneca = require('seneca')({ log: 'silent' });
const chalk = require('chalk');
const dayjs = require('dayjs');

console.log('start webservice');

seneca.client({ type: 'tcp' }).act({ role: 'db', add: 'user', params: { userName: 'test', realName: 'test', password: '123456', createTime: (new dayjs()).format('YYYY-MM-DD HH:mm:ss') } }, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(chalk.green(JSON.stringify(result.data)));
}).act({ role: 'db', add: 'category', params: { categoryName: 'test', createTime: (new dayjs()).format('YYYY-MM-DD HH:mm:ss') } }, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(chalk.green(JSON.stringify(result.data)));
})
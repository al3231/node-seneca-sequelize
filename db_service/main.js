const seneca = require('seneca')({ log: 'silent', debug: { undead: true } });
const fs = require('fs');
const path = require('path');

console.log('start database service');
// 遍历services文件夹里所有文件。注册到微服务容器里
const services = fs.readdirSync(path.join(__dirname, './services'));
services.forEach(name => {
  seneca.use(require(`./services/${name}`));
});
// 微服务TCP协议对外监听
seneca.listen({ type: 'tcp', pin: 'role:db' });
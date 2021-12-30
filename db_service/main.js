const seneca = require('seneca')({ log: 'silent', debug: { undead: true } });
const fs = require('fs');
const path = require('path');

console.log('start database service');

const services = fs.readdirSync(path.join(__dirname, './services'));
services.forEach(name => {
  seneca.use(require(`./services/${name}`));
});

seneca.listen({ type: 'tcp' });
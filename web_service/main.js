


const Express = require('express');
const SenecaWeb = require('seneca-web');
const seneca = require('seneca')(
  // { log: 'silent' }
);
const Routes = require('./routes');
const api = require('./api');
const config = require('./config');

console.log('start webservice');
// 建立Express服务
const app = Express();
app.use(require('body-parser').json());

// Seneca初始化，添加api服务，web插件, 路由
seneca
  .use(api)
  .use(SenecaWeb, {
    routes: Routes,
    adapter: require('seneca-web-adapter-express'),
    context: app,
    options: { parseBody: false }
  })
  .ready((err) => {
    if (err) {
      console.error(err);
    }
    // 启动Web服务
    var server = seneca.export('web/context')();
    // 端口来自配置文件
    const port = config.port;
    server.listen(port, (err) => {
      console.log(err || `server is running at port ${port}`);
    });
  })




const Express = require('express');
const session = require('express-session');
// redis相关引用（使用redis时开启）
// const redis = require("redis");
// const redisStore = require('connect-redis')(session);
const SenecaWeb = require('seneca-web');
const seneca = require('seneca')(
  {
    // log: 'silent',
    debug: {
      undead: true
    }
  }
);
const senecaRoutes = require('./routes/seneca_routes');
const expressRoute = require('./routes/express_routes');
const apiPlugin = require('./api');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const log = require('./libs/log');


console.log('start webservice');
// 建立Express服务
const app = Express();
// 
app.use(require('body-parser').json());

// redis连接客户端（使用redis时开启）
// const redisConf = config.redis;
// const redisClient = redis.createClient(redisConf.port, redisConf.host);
// 注册session 
app.use(session({
  name: 'SESSIONID',
  secret: '100CrediT.Com', //使用随机自定义字符串进行加密
  // store: new redisStore({client: redisClient, ttl: 260}), // 如果pm2启动服务需要redis存储session
  resave: false,
  saveUninitialized: false,//不保存未初始化的cookie，也就是未登录的cookie
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, //设置cookie的过期时间为1天
    activeDuration: 5 * 60 * 1000, // 激活时间，比如设置为30分钟，那么只要30分钟内用户有服务器的交互，那么就会被重新激活。
  }
}));

// 注册其他路由（非seneca配置路由）
app.use(expressRoute);

// Seneca初始化，添加api服务，web插件, 路由
seneca
  .use(apiPlugin)
  .use(SenecaWeb, {
    routes: senecaRoutes,
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
    // express监听
    server.listen(port, (err) => {
      if (err) {
        console.error(err);
        log.error(err);
      }
      console.log(`server is running at port ${port}`);
    });
  })

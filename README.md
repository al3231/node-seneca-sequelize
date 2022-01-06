# node-seneca-sequelize
项目基于 Seneca（微服务框架）实现微服务通信，Sequelize(ORM框架)实现数据库的ORM搭建。采用Log4js日志输出。

项目分为db_service 和 web_service 两部分（实际可通过业务划分微服务）。
db_service 负责数据库操作。
web_service 负责提供API给客户端。

```sh
$ npm install # 安装全局引用
```
或者，使用yarn

```sh
$ npm install yarn -g #如果没有安装yarn 全局安装

$ yarn install # 安装全局引用
```

```sh
$ yarn start:db # 启动db_service
$ yarn start:web # 启动web_service
```

实际项目可使用pm2启动服务：

首先需要全局安装 __pm2__

```sh
$ npm install pm2 -g 
```

# db_service 目录及配置介绍

## 配置

- __db.js :__ 提供数据连接的相关配置。 分为development和production两项配置。可根据环境变量env决定采用哪套配置。



## 目录
- __config:__ 数据库配置
- __entitis:__ Sequelize 初始化， 各个数据实体的数据操作方法
- __models:__ 数据实体，由代码自动生成，生成命令如下：

    ```sh
    $ yarn auto:db # 自动生成数据实体
    ```

- __services:__ 提供微服务路由，对外输出API
- __main.js:__ 为主文件

# web_service 目录及配置介绍
## 配置
- __debug.js :__ 提供调试配置。可关闭验证码验证或Token验证等
- __index.js :__ 提供系统development和production两个环境的对应配置，包括端口，redis等配置

## 目录
- __config:__ 配置文件
- __api:__ 与数据微服务的对接, 并撰写成内部微服务与路由对接
- __libs:__ 公共基础方法 api: 数据统一处理，错误处理。log: log4js日志配置初始化。
- __routes:__ 提供对外API路由配置。express_routes.js 为直接使用express.router配置的路由。 seneca_routes为使用seneca-web插件的路由配置表。
- __main.js:__ web_service主文件



#学习地址

Seneca官方网站 [https://senecajs.org/](https://senecajs.org/)

Seneca中文文档 [https://pub.ofcrab.com/press/getting-started-seneca.html](https://pub.ofcrab.com/press/getting-started-seneca.html)

Senaca Github地址 [https://github.com/senecajs/seneca](https://github.com/senecajs/seneca)

Sequelize文档地址 [https://www.sequelize.com.cn/](https://www.sequelize.com.cn/)

Sequelize Github地址 [https://github.com/sequelize/sequelize](https://github.com/sequelize/sequelize)



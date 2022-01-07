module.exports = {
  development: {
    dbServer: {
      type: 'tcp',
      pin: 'role:db',
      port: 8000,
      // host: '127.0.0.1'
    },
    port: '8088', // 运行端口
    // redis配置
    redis: {
      host: 'localhost',
      port: '6379'
    }
  },
  production: {
    dbServer: {
      type: 'tcp',
      pin: 'role:db',
      port: 8000,
      host: '127.0.0.1'
    },
    port: '8088',
    redis: {
      host: 'localhost',
      port: '6379'
    }
  }
}
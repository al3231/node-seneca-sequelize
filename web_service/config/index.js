module.exports = {
  development: {
    port: '8088', // 运行端口
    // redis配置
    redis: {
      host: 'localhost',
      port: '6379'
    }
  },
  production: {
    port: '8088',
    redis: {
      host: 'localhost',
      port: '6379'
    }
  }
}
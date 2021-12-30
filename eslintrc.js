module.exports = {
  root: true,
  env: {
    "es6": true
  },
  extends: [
    'airbnb',
  ],
  plugins: [],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "object-curly-newline": "off", // 强制花括号内换行符的一致性
    "indent": ["error", 2, { "SwitchCase": 1 }], // 使用两个空格，switch强制缩进default:0
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "max-len": ["error", { code: 300 }], // 每行最长300个字符
    "comma-dangle": "off", // 添加结尾的逗号
    'no-param-reassign': ["error", { "props": false }], // 参数不可改变，属性可改变
    'no-underscore-dangle': 'off', // 前置或后置下划线
    "import/no-unresolved": "off", // 取消自动解析路径，以此开启alias的别名路径设置
    "import/extensions": "off", // 取消对文件扩展名的验证
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
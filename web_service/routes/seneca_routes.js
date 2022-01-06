
const Routes = [
  {
    pin: 'role:api,module:user,method:*',
    prefix: '/api',
    map: {
      login: {
        POST: true
      },
      logout: {
        POST: true
      }
    }
  },
  {
    pin: 'role:api,module:user,method:*',
    prefix: '/api/user',
    map: {
      list: {
        POST: true
      },
      add: {
        POST: true
      }
    }
  }
];

module.exports = Routes;
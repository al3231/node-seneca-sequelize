
const Routes = [
  {
    pin: 'role:api,model:user,method:*',
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
    pin: 'role:api,model:user,method:*',
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
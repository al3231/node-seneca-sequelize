
const Routes = [
  {
    pin: 'role:api,module:user,method:*',
    prefix: '/api/user',
    map: {
      list: {
        GET: true
      },
      add: {
        POST: true
      }
    }
  }
];

module.exports = Routes;
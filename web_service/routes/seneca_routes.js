
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
      },
      update: {
        PUT: true,
        name: ''
      },
      delete: {
        DELETE: true,
        name: ''
      }
    }
  },
  {
    pin: 'role:api,model:product,method:*',
    prefix: '/api/product',
    map: {
      list: {
        POST: true
      },
      add: {
        POST: true
      }
    }
  },
  {
    pin: 'role:api,model:category,method:*',
    prefix: '/api/category',
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
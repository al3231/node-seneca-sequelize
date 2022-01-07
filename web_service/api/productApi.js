
const { validateParameters, invokeDbClient } = require('./utils');

module.exports = function productApi(seneca) {
  seneca.add('role:api,model:product,method:add', function (msg, done) {
    if (validateParameters(msg.args.query, ['categoryId', 'productName'], done)) {
      const { categoryId, productName, ...rest } = msg.args.query;
      const params = {
        categoryId,
        productName,
        ...rest
      };
      invokeDbClient(this, msg, done, params);
    }
  })

  seneca.add('role:api,model:product,method:update', function (msg, done) {
    if (validateParameters(msg.args.query, ['id'], done)) {
      const { id, ...rest } = msg.args.query;
      const params = {
        id,
        ...rest
      };
      invokeDbClient(this, msg, done, params);
    }
  })

  seneca.add('role:api,model:product,method:delete', function (msg, done) {
    if (validateParameters(msg.args.query, ['id'], done)) {
      const { id } = msg.args.query;
      const params = {
        id
      };
      invokeDbClient(this, msg, done, params);
    }
  })
}
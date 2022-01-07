module.exports = function categoryApi(seneca) {
  seneca.add('role:api,model:category,method:add', function (msg, done) {
    if (validateParameters(msg.args.query, ['categoryName'], done)) {
      const { categoryName, ...rest } = msg.args.query;
      const params = {
        categoryName,
        ...rest
      };
      invokeDbClient(this, msg, done, params);
    }
  })

  seneca.add('role:api,model:category,method:update', function (msg, done) {
    if (validateParameters(msg.args.query, ['id'], done)) {
      const { id, ...rest } = msg.args.query;
      const params = {
        id,
        ...rest
      };
      invokeDbClient(this, msg, done, params);
    }
  })

  seneca.add('role:api,model:category,method:delete', function (msg, done) {
    if (validateParameters(msg.args.query, ['id'], done)) {
      const { id } = msg.args.query;
      const params = {
        id
      };
      invokeDbClient(this, msg, done, params);
    }
  })
}
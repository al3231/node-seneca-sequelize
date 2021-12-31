
const codes = {
  SUCCESS: '000000',
  SESSIONID_ERROR: '130004',
  INNER_ERROR: '130009'
}
function validataSession(req, done) {
  if (req.headers.sessionid === undefined) {
    done(null, errorJson({ code: codes.SESSIONID_ERROR, message: '鉴权失败' }))
    return false;
  }
  return true;
}

function succeedJson(data, message = '成功') {
  const rst = { code: codes.SUCCESS, data, message };
  return rst;
}
function errorJson(message = '服务错误', code = codes.INNER_ERROR) {
  const rst = { code, message };
  return rst;
}

module.exports = {
  codes,
  validataSession,
  succeedJson,
  errorJson

}
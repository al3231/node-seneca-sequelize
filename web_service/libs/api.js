const log = require('./log');

const codes = {
  SUCCESS: '000000',
  LOGIN_ERROR: '130001',
  PARAMETERS_ERROR: '130002',
  SESSIONID_ERROR: '130004',
  INNER_ERROR: '130009'
}

const errors = {
  PARAMETERS_ERROR: {
    code: codes.PARAMETERS_ERROR,
    message: '参数错误'
  },
  SESSION_ERROR: {
    code: codes.SESSIONID_ERROR,
    message: '鉴权失败'
  }
}



function validataToken(msg, done) {
  const { request$: req } = msg;
  let valid = true;
  if (req.headers.token === undefined) {
    valid = false;
  } else if (req.headers.token !== req.session.token) {
    valid = false;
  }
  if (!valid) {
    const logInfo = makeLogInfo(msg, errors.SESSION_ERROR);
    log.error(JSON.stringify(logInfo));
    done(null, errors.SESSION_ERROR);
  }
  return valid;
}

function makeLogInfo(msg, respone) {
  const { model, method, request$: req } = msg;
  const headerToken = req.headers?.token;
  const sessiontoken = req.session?.token;
  return { ['header-token']: headerToken || 'undefined', ['session-token']: sessiontoken || 'undefined', model, method, respone };
}


function handleSuccess(data, msg) {
  const rst = { code: codes.SUCCESS, data, message: 'success' };
  const logInfo = makeLogInfo(msg, rst);
  log.info(JSON.stringify(logInfo));
  return rst;
}

function handleError(message = '服务错误', msg, code = codes.INNER_ERROR) {
  const rst = { code, message };
  const logInfo = makeLogInfo(msg, rst);
  log.error(JSON.stringify(logInfo));
  return rst;
}

function validateParameters(query, keys, done) {
  if (!query) {
    done && done(null, errors.PARAMETERS_ERROR);
    return false;
  }
  let valid = true;
  if (keys && keys.length) {
    keys.forEach((k) => {
      if (query[k] === undefined) {
        valid = false;
      }
    });
  }
  if (!valid) {
    done && done(null, errors.PARAMETERS_ERROR);
  }
  return valid;
}

function apiCallBack(err, rst, msg) {
  if (err) {
    return handleError(err, msg, codes.INNER_ERROR);
  }
  const { data } = rst;
  return handleSuccess(data, msg);
}

module.exports = {
  codes,
  errors,
  validataToken,
  handleSuccess,
  handleError,
  validateParameters,
  apiCallBack

}
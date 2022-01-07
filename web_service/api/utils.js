const log = require('../libs/log');
const env = process.env.NODE_ENV || 'development';
const dbServerConf = require('../config/index')[env].dbServer;

// 接口返回码枚举
const codes = {
  SUCCESS: '000000',
  LOGIN_ERROR: '130001',
  PARAMETERS_ERROR: '130002',
  SESSIONID_ERROR: '130004',
  INNER_ERROR: '130009'
}

// 错误消息体枚举
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

/**
 * 
 * 验证消息体token
 * @param {*} msg seneca消息体
 * @param {*} done deneca回调函数
 * @return {*} 是否验证通过
 */
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

/**
 *
 * 生成日志信息
 * @param {*} msg seneca消息体
 * @param {*} respone 返回JSON
 * @return {*} 日志信息JSON
 */
function makeLogInfo(msg, respone) {
  const { model, method, request$: req } = msg;
  const headerToken = req.headers?.token;
  const sessiontoken = req.session?.token;
  return { ['header-token']: headerToken || 'undefined', ['session-token']: sessiontoken || 'undefined', model, method, respone };
}


/**
 * 
 * 执行成功处理，生成成功消息数据
 * @param {*} data 数据体
 * @param {*} msg seneca消息体
 * @return {*} 成功消息数据
 */
function handleSuccess(data, msg) {
  const rst = { code: codes.SUCCESS, data, message: 'success' };
  const logInfo = makeLogInfo(msg, rst);
  log.info(JSON.stringify(logInfo));
  return rst;
}


/**
 * 
 * 执行失败处理，生成错误消息数据
 * @param {*} message 错误信息
 * @param {*} msg seneca消息体
 * @param {*} code 错误码
 * @return {*} 错误消息数据
 */
function handleError(err, msg, code = codes.INNER_ERROR) {
  const rst = { code, message: err.details?.message };
  const logInfo = makeLogInfo(msg, rst);
  log.error(JSON.stringify(logInfo));
  return rst;
}


/**
 *
 * 验证参数是否正确
 * @param {*} query request获取的参数对象
 * @param {*} keys 需要验证的字段名数组
 * @param {*} done 回调函数
 * @return {*} 是否验证成功
 */
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


/**
 *
 * api回调统一处理方法
 * @param {*} seneca seneca实体
 * @param {*} msg 本地seneca的消息体
 * @param {*} done  本地seneca的回调方法
 * @param {*} params  远程seneca通信参数
 * @param {*} onSuccess  成功后数据处理
 * @return {*} 
 */
async function invokeDbClient(seneca, msg, done, params, onSuccess) {
  seneca.act(`role:db,model:${msg.model},method:${msg.method}`, { params }, (err, rst) => {
    if (err) {
      done(handleError(err, msg, codes.INNER_ERROR))
    }
    let data = rst.data;
    if (onSuccess) {
      data = onSuccess(data);
    }
    done(handleSuccess(data, msg));
  });
}

module.exports = {
  codes,
  errors,
  validataToken,
  handleSuccess,
  handleError,
  validateParameters,
  invokeDbClient

}
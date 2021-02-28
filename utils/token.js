/**
 * @token token 生成与验证
 *   生成
 *   验证
 */

//引入模块
const jwt = require("jsonwebtoken");

//私钥
let privateKey = "wusiyu";

//生成token

exports.create = (username, expiresIn = '1h') => {
  //username:用于加密的用户名
  //expires:token有效时间（单位是秒）
  //privateKey:用于加密的私钥
  let token = jwt.sign({ username }, privateKey, {
    expiresIn
  });
  return token;
}

//验证token
exports.verify = (token) => {
  let res = false;
  try {
    res = jwt.verify(token, privateKey);
  } catch (err) {
    res = false;
  }
  return res;
}

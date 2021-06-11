const crypto = require('crypto');

// 创建密匙
const SELECT_KEY = 'WkJi_239@`/.';

// md5加密

function md5 (content) {
  let md5 = crypto.createHash('md5'); // 创建加密对象
  return md5.update(content).digest('hex');   // 把输出变为16进制
}

// 加密函数  内容最好包括密钥和密码
function genPassword (password) {
  const str = `password=${password}&key=${SELECT_KEY}`
  return md5(str);
}

module.exports = {
  genPassword
}
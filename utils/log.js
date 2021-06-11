const fs = require('fs');
const path = require('path');

// 生成writeStream
function createWrieStream () {
  const fullFileName = path.join(__dirname, '../',  'logs', 'access.log');  // 找到文件的路径
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'   // 表示日志以追加的形式写入
  });
  return writeStream;
}

module.exports =  createWrieStream();

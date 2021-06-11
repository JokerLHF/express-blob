const { exec } = require('../db/mysql');
const xss = require('xss');

// 查看博客列表
const getList = (author, keyword) => {
  let sql = `select * from blobList where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }
  return exec(sql);
}

// 查看某一篇博客详情
const getDetails = (id) => {
  let sql = `select * from blobList where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}

// 新增博客
const newBlob = ({ author, content, title }) => {
  title = xss(title);
  let sql = `insert into blobList values(null, '${author}', '${content}', '${title}')`;
  return exec(sql).then(result => {
    return {
      id: result.insertId
    };
  })
}

// 删除博客
const deleteBlob = (id) => {
  let sql = `delete from blobList where id='${id}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

// 更新博客
const updateBlob = (id, content, title) => {
  let sql = `update blobList set content='${content}', title='${title}' where id='${id}'`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}
module.exports = {
  getList,
  getDetails,
  newBlob,
  deleteBlob,
  updateBlob
}
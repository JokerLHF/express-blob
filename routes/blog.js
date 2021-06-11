var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/blog');
const loginCheck = require('../middleware/loginCheck');
const judgeNull = require('../middleware/judgeNull');
const { getList, getDetails, newBlob, deleteBlob, updateBlob } = require('../controller/blog');

const { exec } = require('../db/mysql.js');

router.get('/list', function (req, res, next) {
  const { author = '', keyword = '' } = req.query;
  const result = getList(author, keyword);
  result.then(listData => {
    if (listData) {
      res.json(new SuccessModal(listData));
      return;
    }
    res.json(new ErrorModal('查询失败'));
  })
});


router.post('/new', loginCheck, judgeNull("content", "title"), function (req, res, next) {
  req.body.author = req.session.username;
  const result = newBlob(req.body);
  result.then(data => {
    if (data.id) { // 如果有就表明插入成功
      res.json(new SuccessModal(data));
      return;
    }
    res.json(new ErrorModal('新建失败'));
  })
});



router.post('/update', loginCheck, judgeNull("id", "content", "title"), function (req, res, next) {
  const { id, content, title } = req.body;
  let result = updateBlob(id, content, title);
  result.then(data => {
    if (data) {
      res.json(new SuccessModal('更新成功'));
      return;
    }
    res.json(new ErrorModal('更新失败'));
  })
});





router.get('/detail', judgeNull('id'), function (req, res, next) {
  const { query: { id } } = req;

  const result = getDetails(id);
  result.then(result => {
    if (result) {
      res.json(new SuccessModal(result));
      return;
    }
    res.json(new ErrorModal('查询失败, 请输入id或者没有改id'));
  })
});




router.get('/del', loginCheck, judgeNull("id"), function (req, res, next) {
  const { id } = req.query;
  let result = deleteBlob(id);
  result.then(data => {
    if (data) {
      res.json(new SuccessModal('删除成功'));
      return;
    }
    res.json(new ErrorModal('删除失败'));
  })
});








router.get('/tree', function (req, res, next) {
  let sql = `select * from reply re where re.article_id = 1`
  let replyComment = `SELECT * FROM reply_comment rec WHERE rec.comment_id = 1;`
  exec(sql).then(comment => {
    console.log(comment)
    // res.json(data);
    exec(replyComment).then(reply => {
      res.json(data.concat(reply))
      console.log(reply)
      toRenderTree(data, reply)
      return;
    })
  })
})


let toRenderTree = (comment, reply) => {
  console.log(comment, reply);
  comment.forEach(item => {

  })
}





















module.exports = router;

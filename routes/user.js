var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/blog');
const { login } = require('../controller/user')

router.post('/login', function (req, res, next) {
  const { body: { username, password }} = req;
  let loginResult = login(username, password);

  loginResult.then(data => {
    if (data) {
      const { username, relname } = data;
      req.session.username = username;
      req.session.relname = relname;
      res.json(new SuccessModal(data));
      return;
    }
    res.json(new ErrorModal('账号或者密码错误'));
  })
  
});

module.exports = router;

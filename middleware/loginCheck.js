const { ErrorModal } = require('../model/blog')
module.exports = (req, res, next) => {
  if(!req.session.username) {
    res.json(new ErrorModal('尚未登陆'));
    return;
  }
  next();
}
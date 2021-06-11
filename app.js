const createError = require('http-errors');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

// const blogRouter = require('./routes/blog');
// const userRouter = require('./routes/user');


// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

// const wrieStream = require('./utils/log');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Sec-Fetch-Dest, Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});


app.post('/login', function (req, res) {
  console.log('post', req.body);
  res.json([{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 },]);
})

app.listen(9999)
// let count = 0;
// app.get('/getData', function (req, res) {
//   count++;
//   console.log(count)
//   res.json([{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 },]);
// })

// const ENV = process.env.NODE_ENV;

// if (ENV === 'production') {
//   // 线上环境
//   app.use(logger('combined', {
//     stream: wrieStream
//   }))
// } else {
//   // 开发环境
//   app.use(logger('dev'));
// }


// app.use(cookieParser());


// const redisClinet = require('./db/redis');
// const sessionStore = new RedisStore({
//   client: redisClinet
// });

// app.use(session({
//   secret: 'Aa12@_0Ds',  // 随便输的一个密钥。生成那个sessionID
//   cookie: {
//     path: '/',  // 默认
//     httpOnly: true, // 默认
//     maxAge: 24 * 60 * 60 * 1000 // 客户端的cookie在24小时失效
//   },
//   store: sessionStore,  // 表明把session存到store
// }))





// app.use('/api/blog', blogRouter);
// app.use('/api/user', userRouter);

// app.get('/test', function (req, res, next) {
//   console.log('中间件1');
//   next();
// }, function (req, res, next) {
//   console.log('中间件2');
// })

// app.use(function (req, res, next) {
//   console.log('我是中间件')
//   // next();
//   res.json('我错误');
// })

// app.get('/test', function (req, res, next) {
//   Promise.reject();
// })

// app.use(function (req, res, next) {
//   console.log('我是中间件a开始');
//   next();
//   console.log('我是中间件a结束');
// })

// app.use(function (req, res, next) {
//   console.log('我是中间件b开始');
//   res.json('1');
//   console.log('我是中间件b结束');
// })


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });


// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   // res.locals.message = err.message;
//   // res.locals.error = req.app.get('env') === 'dev' ? err : {};
//   console.log(err, '这是err');
//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: err
//   });
// });

module.exports = app;

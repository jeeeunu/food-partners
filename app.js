const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 3018;

const loginRouter = require('./routes/login.js');
const signRouter = require('./routes/sign.js');
const logoutRouter = require('./routes/logout.js');
const postsRouter = require('./routes/posts.router.js');
const userRouter = require('./routes/users_route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', [loginRouter, signRouter, logoutRouter, userRouter, postsRouter]);
app.use(express.static('./static'));
// 이미지 파일
app.use('/img-server', express.static(path.join(__dirname, 'img-server')));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

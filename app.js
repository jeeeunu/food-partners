const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3018;

const loginRouter = require('./routes/login.js');
const signRouter = require('./routes/sign.js');
const logoutRouter = require('./routes/logout.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', [loginRouter, signRouter, logoutRouter]);
app.use(express.static('./static'));
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

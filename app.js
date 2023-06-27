const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3018;

const loginRouter = require('./routes/login.js');
const singRouter = require('./routes/sign.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', [loginRouter, singRouter]);
app.use(express.static('./static'));
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

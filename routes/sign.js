const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Users } = require('../models');
const upload = require('../middlewares/uploadFile.js');

router.post('/signup', upload, async (req, res) => {
  const { email, nickname, password, confirmPassword, birth, gender, address, introduce } = req.body;
  const profilepicture = `/img-server/${req.file.filename}`;
  const regExp1 = /^[a-zA-z0-9]{3,12}$/;
  const regExp2 = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{4,16}$/;
  if (!regExp1.test(nickname)) {
    res.status(400).json({
      errorMessage: '닉네임은 영문 대소문자와 숫자 3~12자리로 입력해주세요.',
    });
    return;
  }

  if (!regExp2.test(password)) {
    res.status(400).json({
      errorMessage: '비밀번호는 영문 대소문자와 특수문자로 이루어진 4~16자리로 입력해주세요.',
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
    });
    return;
  }

  const existNickname = await Users.findOne({ where: { nickname: nickname } });
  const existEmail = await Users.findOne({ where: { email: email } });
  if (existNickname) {
    res.status(400).json({
      errorMessage: '중복된 닉네임입니다.',
    });
    return;
  }

  if (existEmail) {
    res.status(400).json({
      errorMessage: '이미 가입된 이메일입니다.',
    });
    return;
  }

  const user = await Users.create({ nickname, password, profilepicture, birth, gender, address, introduce });

  res.status(201).json({ result: user });
});

module.exports = router;

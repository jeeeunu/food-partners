const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware.js');
const upload = require('../middlewares/uploadFile.js');
const path = require('path');
const fs = require('fs');
router.get('/userInfo', authMiddleware, async (req, res) => {
  const userid = res.locals.user.userid;

  const user = await Users.findOne({
    attributes: ['email', 'profilepicture', 'nickname', 'birth', 'gender', 'address', 'introduce', 'updatedAt'],
    where: { userid },
  });

  return res.status(200).json({ result: user });
});

router.put('/userInfo', authMiddleware, upload, async (req, res) => {
  const { nickname, password, confirm, birth, gender, address, introduce } = req.body;
  let profilepicture = req.file;
  if (profilepicture) {
    profilepicture = path.join('img-server', req.file.filename);
  }
  const regExp1 = /^[a-zA-z0-9]{3,12}$/;
  const regExp2 = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{4,16}$/;
  if (!regExp1.test(nickname)) {
    res.status(400).json({
      errorMessage: '닉네임은 영문 대소문자와 숫자 3~12자리로 입력해주세요.',
    });
    if (profilepicture) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  if (!regExp2.test(password)) {
    res.status(400).json({
      errorMessage: '비밀번호는 영문 대소문자와 특수문자로 이루어진 4~16자리로 입력해주세요.',
    });
    if (profilepicture) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  if (password !== confirm) {
    res.status(400).json({
      errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
    });
    if (profilepicture) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  const existNickname = await Users.findOne({ where: { nickname: nickname } });

  if (existNickname && existNickname.nickname !== nickname) {
    res.status(400).json({
      errorMessage: '중복된 닉네임입니다.',
    });
    if (profilepicture) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  const userid = res.locals.user.userid;
  const existuser = await Users.findOne({ where: userid });
  if (existuser) {
    if (fs.existsSync(existuser.profilepicture)) {
      fs.unlinkSync(existuser.profilepicture);
    }
    await Users.update({ nickname, password, profilepicture, birth, gender, address, introduce }, { where: { userid } });
    res.status(200).json({ success: 'true' });
  } else {
    res.status(400).json({ success: 'false', errorMessage: '오류가 발생했습니다.' });
  }
});

router.delete('/userInfo', authMiddleware, async (req, res) => {
  const userid = res.locals.user.userid;
  const existsUser = await Users.findOne({ where: { userid } });
  if (existsUser) {
    await Users.destroy({ where: { userid } });
    res.status(200).json({ result: 'success' });
  } else {
    res.status(403).json({ result: 'false', errorMessage: '탈퇴를 진행할 아이디를 로그인해주세요.' });
  }
});

module.exports = router;

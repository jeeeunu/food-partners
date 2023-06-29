const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware.js');
const upload = require('../middlewares/uploadFile.js');

router.get('/users/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findOne({
    attributes: ['email', 'profilepicture', 'nickname', 'birth', 'gender', 'address', 'introduce', 'updatedAt'],
    where: { userId },
  });

  return res.status(200).json({ data: user });
});

router.put('/users/:userId', authMiddleware, upload, async (req, res) => {
  const { userId } = req.params;
  const { email, nickname, password, confirm, birth, gender, address, introduce } = req.body;
  let profilepicture = req.file;
  if (profilepicture) {
    profilepicture = path.join('uploads', req.file.filename);
  }
  const regExp1 = /^[a-zA-z0-9]{3,12}$/;
  const regExp2 = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{4,16}$/;
  if (!regExp1.test(nickname)) {
    res.status(400).json({
      errorMessage: '닉네임은 영문 대소문자와 숫자 3~12자리로 입력해주세요.',
    });
    fs.unlinkSync('./img-server/' + req.file.filename);
    return;
  }

  if (!regExp2.test(password)) {
    res.status(400).json({
      errorMessage: '비밀번호는 영문 대소문자와 특수문자로 이루어진 4~16자리로 입력해주세요.',
    });
    fs.unlinkSync('./img-server/' + req.file.filename);
    return;
  }

  if (password !== confirm) {
    res.status(400).json({
      errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
    });
    fs.unlinkSync('./img-server/' + req.file.filename);
    return;
  }

  const existNickname = await Users.findOne({ where: { nickname: nickname } });
  const existEmail = await Users.findOne({ where: { email: email } });

  if (existNickname) {
    res.status(400).json({
      errorMessage: '중복된 닉네임입니다.',
    });
    fs.unlinkSync('./img-server/' + req.file.filename);
    return;
  }

  if (existEmail) {
    res.status(400).json({
      errorMessage: '이미 가입된 이메일입니다.',
    });
    fs.unlinkSync('./img-server/' + req.file.filename);
    return;
  }
  const UserId = res.locals.user.userId;
  const existuser = findeOne({ where: userId });
  if (existuser) {
    if (existsPosts.userId === UserId) {
      await Users.update({ email, nickname, password, profilepicture, birth, gender, address, introduce }, { where: userId });
      res.json({ success: 'true' });
    }
  } else {
    res.json({ success: 'false', errorMessage: '오류가 발생했습니다.' });
  }
});

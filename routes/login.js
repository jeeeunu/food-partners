const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (!user || user.password !== password) {
    res.status(400).json({ errorMessage: '회원 정보가 동일하지 않습니다. 다시 시도해주세요.' });
    return;
  }
  const token = jwt.sign({ userId: user.userId }, 'customized-secret-key');
  res.cookie('Authorization', `Bearer ${token}`);
  res.status(200).json({ token });
});

module.exports = router;

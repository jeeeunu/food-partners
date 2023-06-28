const express = require('express');
const router = express.Router();

router.delete('/logout', async (req, res) => {
  try {
    res.clearCookie('Authorization');
    alert('로그아웃이 완료되었습니다.');
    window.location.href = '/html/sign-in.html';
  } catch {
    res.status(401).send({ errorMassege: '로그인이 되어있지 않습니다.' });
  }
});
module.exports = router;

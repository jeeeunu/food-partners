const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  // console.log(Authorization)
  const [authType, authToken] = (Authorization ?? '').split(' ');


  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인을 해주세요.',
    });
    return;
  }

  console.log(authToken)

  try {
    const { userId } = jwt.verify(authToken, 'customized-secret-key');
    // console.log(userId)
    const user = await Users.findOne({ where: { userId } });
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: '로그인해주세요.',
    });
  }
};

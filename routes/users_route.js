const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware.js');

router.get('/users/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findOne({
    attributes: ['email', 'profilepicture', 'nickname', 'birth', 'gender', 'address', 'introduce', 'updatedAt'],
    where: { userId },
  });

  return res.status(200).json({ data: user });
});

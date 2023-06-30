const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/auth-middleware.js');
const { Posts } = require('../models/index.js');
const { Users } = require('../models/index.js');
const upload = require('../middlewares/uploadFile.js');
const fs = require('fs');

// POST
router.post('/posts', authMiddleware, upload, async (req, res) => {
  const { title, content } = req.body;
  const userid = res.locals.user.userid;
  let profilepicture = req.file;

  if (profilepicture) {
    profilepicture = path.join('img-server', req.file.filename);
  }

  const post = await Posts.create({
    userid: userid,
    title: title,
    thumbnail: profilepicture,
    content: content,
    createdAt: Date(),
    updatedAt: Date(),
  });

  res.status(201).json({ data: post });
});

// GET
router.get('/posts', async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ['title', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({ data: posts });
});

// GET : myPost
router.get('/myPost', authMiddleware, async (req, res) => {
  const userid = res.locals.user.userid;

  const post = await Posts.findOne({
    attributes: ['email', 'password', 'profilepicture', 'nickname', 'birth', 'gender', 'address', 'introduce', 'updatedAt'],
    where: { userid },
  });
});

router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ['postId', 'title', 'content', 'createdAt', 'updatedAt'],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

router.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  const post = await Posts.findOne({ where: { postId } });

  await Posts.destroy({
    where: { postId },
  });
  return res.status(200).json({ data: '게시글이 삭제되었습니다.' });
});

router.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const updatedAt = Date();
  const post = await Posts.findOne({ where: { postId } });

  await Posts.update(
    { title, content, updatedAt }, // title과 content 컬럼을 수정합니다.
    {
      where: {
        postId,
      },
    }
  );

  return res.status(200).json({ data: '게시글이 수정되었습니다.' });
});

module.exports = router;

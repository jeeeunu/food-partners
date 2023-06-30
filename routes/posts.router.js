const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Posts } = require('../models');
const { Op } = require('sequelize');
const upload = require('../middlewares/uploadFile.js');
const fs = require('fs');

router.post('/', authMiddleware, upload, async (req, res) => {
  const { title, content } = req.body;
  let thumbnail = req.file;
  if (thumbnail) {
    thumbnail = path.join('img-server', req.file.filename);
  }
  const UserId = res.locals.user.userid;

  if (title.length === 0) {
    res.status(400).json({
      errorMessage: '제목을 작성해주세요.',
    });
    if (thumbnail) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  if (content.lenght === 0) {
    res.status(400).json({
      errorMessage: '내용을 작성해주세요.',
    });
    if (thumbnail) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  const post = await Posts.create({ title, UserId, thumbnail, content });
  res.status(201).json({ data: post });
});

router.get('/', async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ['title', 'thumbnail', 'content', 'createdAt'],
    include: [
      {
        model: users,
        attributes: ['nickname'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  return res.status(200).json({ data: posts });
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ['title', 'thumbnail', 'content', 'createdAt', 'updatedAt'],
    where: { postId: postId },
  });
  return res.status(200).json({ data: post });
});

router.delete('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const UserId = res.locals.user.userid;
  const post = await Posts.findOne({ where: { postId: postId } });

  if (!post) {
    return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
  } else if (post.UserId !== UserId) {
    return res.status(401).json({ message: '권한이 없습니다.' });
  }

  await Posts.destroy({
    where: { [Op.and]: [{ postId: postId }, { UserId: UserId }] },
  });
  return res.status(200).json({ data: '게시글이 삭제되었습니다.' });
});

router.put('/:postId', authMiddleware, upload, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const UserId = res.locals.user.userid;
  const post = await Posts.findOne({ where: { postId: postId } });
  if (!post) {
    return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
  } else if (post.UserId !== UserId) {
    return res.status(401).json({ message: '권한이 없습니다.' });
  }

  let thumbnail = req.file;
  if (thumbnail) {
    thumbnail = path.join('img-server', req.file.filename);
  }

  if (title.length === 0) {
    res.status(400).json({
      errorMessage: '제목을 작성해주세요.',
    });
    if (thumbnail) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  if (content.lenght === 0) {
    res.status(400).json({
      errorMessage: '내용을 작성해주세요.',
    });
    if (thumbnail) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  const existuser = await Posts.findOne({ where: { postId: postId } });

  if (existuser) {
    if (thumbnail) {
      if (fs.existsSync(existuser.thumbnail)) {
        fs.unlinkSync(existuser.thumbnail);
      }
    }
    await Posts.update({ title, thumbnail, content }, { where: { postId: postId } });
    res.status(200).json({ data: '게시글이 수정되었습니다.' });
  } else {
    res.status(400).json({ success: 'false', errorMessage: '오류가 발생했습니다.' });
  }
});

module.exports = router;

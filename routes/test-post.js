const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Posts } = require('../models');
const upload = require('../middlewares/uploadFile.js');
const fs = require('fs');

router.post('/', upload, async (req, res) => {
  const { title, thumbnail, content } = req.body;
  const post = await Posts.create({
    postId: postId,
    title: title,
    thumbnail: thumbnail,
    content: content,
    createdAt: Date(),
    updatedAt: Date(),
  });
  res.status(201).json({ data: post });
});

router.get('/', async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ['postId', 'title', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({ data: posts });
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ['postId', 'title', 'content', 'createdAt', 'updatedAt'],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;

  const post = await Posts.findOne({ where: { postId } });

  await Posts.destroy({
    where: { postId },
  });
  return res.status(200).json({ data: '게시글이 삭제되었습니다.' });
});

router.put('/:postId', async (req, res) => {
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

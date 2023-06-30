// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth-middleware');
// const { Posts } = require('../models');
// const { Op } = require('sequelize');

// router.post('/', authMiddleware, async (req, res) => {
//   const { title, thumbnail, content, createdAt, updatedAt } = req.body;
//   const { userId } = res.locals.user;
//   const post = await Posts.creante({
//     postId: userId,
//     title: title,
//     thumbnail: thumbnail,
//     content: content,
//     createdAt: Date(),
//     updatedAt: Date(),
//   });
//   res.status(201).json({ data: post });
// });

// router.get('/', async (req, res) => {
//   const posts = await Posts.findAll({
//     attributes: ['Id', 'title', 'createdAt', 'updatedAt'],
//     order: [['createdAt', 'DESC']],
//   });

//   return res.status(200).json({ data: posts });
// });

// router.get('/:Id', async (req, res) => {
//   const { Id } = req.params;
//   const post = await Posts.findOne({
//     attributes: ['postId', 'title', 'content', 'createdAt', 'updatedAt'],
//     where: { Id },
//   });

//   return res.status(200).json({ data: post });
// });

// router.delete('/:Id', async (req, res) => {
//   const { Id } = req.params;
//   const { userId } = req.locals.user;
//   const post = await Posts.findOne({ where: { Id } });

//   if (!post) {
//     return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
//   } else if (post.UserId !== userId) {
//     return res.status(401).json({ message: '권한이 없습니다.' });
//   }

//   await Posts.destroy({
//     where: { [Op.and]: [{ Id }, { UserId: userId }] },
//   });
//   return res.status(200).json({ data: '게시글이 삭제되었습니다.' });
// });

// router.put('/:Id', async (req, res) => {
//   const { Id } = req.params;
//   const { userId } = req.locals.user;
//   const { title, content } = req.body;
//   const updatedAt = Date();
//   const post = await Posts.findOne({ where: { Id } });

//   if (!post) {
//     return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
//   } else if (post.UserId !== userId) {
//     return res.status(401).json({ message: '권한이 없습니다.' });
//   }

//   await Posts.update(
//     { title, content, updatedAt }, // title과 content 컬럼을 수정합니다.
//     {
//       where: {
//         postId,
//       },
//     }
//   );

//   return res.status(200).json({ data: '게시글이 수정되었습니다.' });
// });

// module.exports = router;

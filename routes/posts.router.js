const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Posts } = require('../models');
const { Op } = require('sequelize');
const upload = require('../middlewares/uploadFile.js');
const fs = require('fs');
const { Users } = require('../models');
const path = require('path');

router.post('/posts', authMiddleware, upload, async (req, res) => {
  const { title, content } = req.body;
  let profilepicture = req.file;
  let thumbnail = profilepicture;
  if (thumbnail) {
    thumbnail = path.join('img-server', req.file.filename);
  }
  const UserId = res.locals.user.userid;

  if (!title) {
    res.status(400).json({
      errorMessage: '제목을 작성해주세요.',
    });
    if (thumbnail) {
      fs.unlinkSync('./img-server/' + req.file.filename);
    }
    return;
  }

  if (!content) {
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

router.get('/posts', async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ['postId', 'title', 'thumbnail', 'content', 'createdAt'],
    include: [
      {
        model: Users,
        attributes: ['nickname'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  return res.status(200).json({ data: posts });
});

// 내가 작성한 글 API
router.get('/myPost', authMiddleware, async (req, res) => {
  const userid = res.locals.user.userid;
  const posts = await Posts.findAll({
    attributes: ['postId', 'title', 'thumbnail', 'content', 'createdAt'],
    include: [
      {
        model: Users,
        where: {
          userid: userid,
        },
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  return res.status(200).json({ data: posts });
});

// GET: 게시글 상세
router.get('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Posts.findOne({
      where: { postId: postId },
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
    });

    if (!post) {
      return res.status(404).send('해당하는 게시글을 찾을 수 없습니다.');
    }

    const nickname = post.User ? post.User.nickname : '유저를 찾을 수 없습니다.';

    return res.render('detail-post', { post: post, postId: postId });
  } catch (error) {
    console.error(error);
    return res.status(400).send('게시글 조회에 실패했습니다.');
  }
});

router.delete('/posts/:postId', authMiddleware, async (req, res) => {
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

// 게시글 수정 페이지 render하기
router.get('/posts/edit/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    // 게시글을 조회하거나 필요한 데이터를 가져오는 코드 추가

    // 예를 들어, 게시글 데이터를 조회하고 해당 데이터를 템플릿에 전달한다고 가정
    const post = await Posts.findOne({
      attributes: ['title', 'content'],
      where: { postId: postId },
      // 필요한 include 등의 옵션 추가
    });

    if (!post) {
      return res.status(404).send('Post not found');
    }

    return res.render('detail-edit', { post: post });
  } catch (error) {
    console.error(error);
    return res.status(400).send('게시글 수정 페이지를 불러오는 것을 실패했습니다.');
  }
});

// PUT: 게시글 수정
router.put('/posts/:postId', authMiddleware, upload, async (req, res) => {
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

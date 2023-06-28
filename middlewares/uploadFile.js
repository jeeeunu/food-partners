const multer = require('multer');

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img-server');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single('profilePicture');

module.exports = uploadFile;

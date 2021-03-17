const multer = require('multer');
const path = require('path');
require('dotenv').config();
const UPLOAD_DIRECTORY = path.join(process.cwd(), process.env.UPLOAD_DIRECTORY);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIRECTORY);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }

    if (!file.mimetype.includes('image')) {
      cb(null, false);
    }

    cb(new Error("I don't have a clue!"));
  },
});

module.exports = upload;

const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
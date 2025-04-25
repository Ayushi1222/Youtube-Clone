const express = require('express');
const router = express.Router();
const { 
  getVideos, 
  getVideoById, 
  createVideo, 
  updateVideoLikes 
} = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.post('/', protect, createVideo);
router.put('/:id/like', protect, updateVideoLikes);

module.exports = router;
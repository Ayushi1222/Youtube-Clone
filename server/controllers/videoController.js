const Video = require('../models/Video');
const Comment = require('../models/Comment');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const videos = await Video.find(query).sort({ uploadDate: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });

    if (video) {
      video.views += 1;
      await video.save();
      
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a video
// @route   POST /api/videos
// @access  Private
const createVideo = async (req, res) => {
  try {
    const {
      videoId,
      title,
      thumbnailURL,
      description,
      channelId,
      category
    } = req.body;

    const video = new Video({
      videoId,
      title,
      thumbnailURL,
      description,
      channelId,
      uploader: req.user._id,
      category
    });

    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update video likes/dislikes
// @route   PUT /api/videos/:id/like
// @access  Private
const updateVideoLikes = async (req, res) => {
  try {
    const { action } = req.body; // 'like' or 'dislike'
    const video = await Video.findOne({ videoId: req.params.id });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (action === 'like') {
      video.likes += 1;
    } else if (action === 'dislike') {
      video.dislikes += 1;
    }

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVideos, getVideoById, createVideo, updateVideoLikes };
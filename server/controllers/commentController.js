const Comment = require('../models/Comment');
const User = require('../models/User');

// @desc    Get comments for a video
// @route   GET /api/comments/:videoId
// @access  Public
const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .sort({ timestamp: -1 })
      .populate('userId', 'username avatar');
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    const comment = new Comment({
      videoId,
      userId: req.user._id,
      text
    });

    const newComment = await comment.save();
    
    const populatedComment = await Comment.findById(newComment._id)
      .populate('userId', 'username avatar');
    
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    comment.text = text;
    const updatedComment = await comment.save();
    
    const populatedComment = await Comment.findById(updatedComment._id)
      .populate('userId', 'username avatar');
    
    res.json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommentsByVideo,
  createComment,
  updateComment,
  deleteComment
};
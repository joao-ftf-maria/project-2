const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true
  },
  banner: {
    type: String
  },
  content: {
    type: String,
    minlength: 3,
    maxlength: 280,
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

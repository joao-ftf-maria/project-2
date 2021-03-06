'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a unique email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dloalbeo7/image/upload/v1596723467/oni-default-icon_360_rlsq8h.png'
    },
    banner: {
      type: String,
      default:
        'https://res.cloudinary.com/dloalbeo7/image/upload/v1596728409/jkkszls8r3cfmsq0du7r.jpg'
    },
    tagline: {
      type: String
    },
    role: {
      type: String,
      enum: ['User', 'Moderator'],
      required: true,
      default: 'User'
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: {
      type: String,
      unique: true
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    feed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = mongoose.model('User', userSchema);

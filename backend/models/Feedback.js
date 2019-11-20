'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    nickname: {
      type: String,
      ref: 'users'
    },
    email: {
      type: String,
      ref: 'users'
    }
  },

  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports =
  mongoose.models.feedbacks || mongoose.model('feedbacks', FeedbackSchema);

'use strict';
const Feedback = require('../../models/Feedback');
const { nofeedback } = require('../../constants/constants');

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ date: -1 });
    feedbacks.length === 0
      ? res.status(404).json(nofeedback)
      : res.json(feedbacks);
  } catch (err) {
    res.status(400).json(nofeedback);
  }
};
module.exports = {
  getFeedbacks
};

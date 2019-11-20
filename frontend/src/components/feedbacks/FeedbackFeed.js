import React from 'react';
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';
const FeedbackFeed = ({ feedbacks }) =>
  feedbacks.map(feedback => (
    <FeedbackItem key={feedback._id} feedback={feedback} />
  ));

FeedbackFeed.propTypes = {
  feedbacks: PropTypes.array.isRequired
};

export default FeedbackFeed;

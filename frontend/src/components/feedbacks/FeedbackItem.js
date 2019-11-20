import React from 'react';
import PropTypes from 'prop-types';
// import avatar from '../../img/avatarDefault.png';
import { Link } from 'react-router-dom';

const FeedbackItem = ({ feedback }) => (
  <div className="card border-info mb-3">
    <div className="card-header">
      <Link className="text-info" style={{ textDecoration: 'none' }} to="/">
        Название забега
      </Link>
    </div>
    <div className="card-body text-info">
      <div className="row">
        <div className="col-md-3">
          <Link to="/">
            {/* <img src={avatar} className="rounded-circle" alt="" /> */}
          </Link>
          <br />
          <p style={{ fontSize: '130%' }} className="text-center">
            {feedback.user.nickname}
          </p>
        </div>
        <div className="col-md-9">
          <p className="card-text lead">{feedback.text}</p>
        </div>
      </div>
    </div>
  </div>
);

FeedbackItem.propTypes = {
  feedback: PropTypes.object.isRequired
};
export default FeedbackItem;

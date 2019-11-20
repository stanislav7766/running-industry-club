import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import FeedbackFeed from './FeedbackFeed';

import { getFeedbacks } from '../../actions/feedbacksActions';
class Feedbacks extends Component {
  componentDidMount = () => this.props.getFeedbacks();

  render() {
    const { feedbacks, loading } = this.props.feedback;
    let feedbackContent =
      !feedbacks || loading ? (
        <Spinner />
      ) : (
        <FeedbackFeed feedbacks={feedbacks} />
      );

    return (
      <div className="feed">
        <div className="container mt-150">
          <div className="row">
            <div className="col-10 mx-auto mb-5">
              <h1 className="display-4 text-center">Отзывы </h1>
              <p className="lead text-center">
                Здесь вы можете увидеть впечатления различных людей о последних
                забегов
              </p>
              {feedbackContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Feedbacks.propTypes = {
  getFeedbacks: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  feedback: state.feedback
});

export default connect(
  mapStateToProps,
  { getFeedbacks }
)(Feedbacks);

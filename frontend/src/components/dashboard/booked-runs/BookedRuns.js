import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OwnBookedRuns from './OwnBookedRuns';
import FormBookingRun from './FormBookingRun';
class BookedRuns extends Component {
  state = {
    isSubmited: false
  };
  shouldComponentUpdate = (nextProps, nextState) =>
    this.state.isSubmited !== nextState.isSubmited ? true : false;

  changeIsSubmited = () =>
    this.setState(prevState => ({
      isSubmited: !prevState.isSubmited
    }));

  render() {
    const { user } = this.props.auth;

    const RunsContent = (
      <div className="mt-5">
        <h4 className="text-center mb-4">
          {user.nickname}, Ваши запланированные забеги
        </h4>

        <OwnBookedRuns
          isSubmited={this.state.isSubmited}
          changeIsSubmited={this.changeIsSubmited}
        />
        <h4 className="text-center mt-4 mb-4">
          Желаете записаться на еще один забег?
        </h4>
        <FormBookingRun
          isSubmited={this.state.isSubmited}
          changeIsSubmited={this.changeIsSubmited}
        />
      </div>
    );
    return (
      <div className="booked-runs">
        <div className="light-overlay">
          <div className="container mt-150">
            <div className="row">
              <div className="col-10 mx-auto">
                <a href="/own-profile" className="btn btn-outline-dark">
                  Вернуться
                </a>
                {RunsContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
BookedRuns.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(BookedRuns);

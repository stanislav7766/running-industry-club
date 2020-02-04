import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  resetErrors,
  bookingRun,
  getCurrentProfile,
  deleteBookedRun,
  paidBookedRun
} from '../../actions/profileActions';

import BookingRunTable from '../../components/booking-run-table';
import BookingRunForm from '../../components/booking-run-form';
const BookingRun = props => {
  const [isSubmited, setIsSubmitted] = useState(false);
  const { user } = props.auth;
  const { profile } = props.profile;

  useEffect(() => {
    const fetchCurrentProfile = async () => await props.getCurrentProfile();
    fetchCurrentProfile();
  }, []);

  const changeIsSubmited = () => setIsSubmitted(!isSubmited);

  const RunsContent = (
    <div className="mt-5">
      <h4 className="text-center mb-4">
        {user.nickname}, Ваши запланированные забеги
      </h4>

      <BookingRunTable
        isSubmited={isSubmited}
        getCurrentProfile={props.getCurrentProfile}
        profile={profile}
        deleteBookedRun={props.deleteBookedRun}
        paidBookedRun={props.paidBookedRun}
      />
      <h4 className="text-center mt-4 mb-4">
        Желаете записаться на еще один забег?
      </h4>
      <div className="col-md-8 mx-auto">
        <BookingRunForm
          changeIsSubmited={changeIsSubmited}
          propsErrors={props.errors}
          resetErrors={props.resetErrors}
          location={props.location}
          bookingRun={props.bookingRun}
        />
      </div>
    </div>
  );
  return useMemo(
    () => (
      <div className="booked-runs main-image-template">
        <div className="light-overlay">
          <div className="container">
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
    ),
    [isSubmited, profile]
  );
};

BookingRun.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteBookedRun: PropTypes.func.isRequired,
  paidBookedRun: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  bookingRun: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, {
  resetErrors,
  bookingRun,
  getCurrentProfile,
  deleteBookedRun,
  paidBookedRun
})(BookingRun);

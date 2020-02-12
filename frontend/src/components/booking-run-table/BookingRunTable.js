import React, { useEffect, useCallback, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from '../common/Spinner';
import RunStatus from '../run-status';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

//TODO: check re-renders, fix date type

const BookingRunTable = ({
  propsErrors,
  profile,
  isSubmited,
  getCurrentProfile,
  deleteBookedRun,
  paidBookedRun
}) => {
  const onDeleteClick = run_id => deleteBookedRun(run_id);
  const onPaidClick = run_id => paidBookedRun(run_id);

  const fetchProfile = useCallback(async () => await getCurrentProfile(), [
    getCurrentProfile
  ]);

  useEffect(() => {
    isEmpty(propsErrors) && fetchProfile();
  }, [isSubmited, fetchProfile, propsErrors]);

  const BookedRuns =
    profile &&
    profile.bookedRuns &&
    profile.bookedRuns.map(run => (
      <tr key={run._id}>
        <td>{run.nameRun}</td>
        <td>{run.date}</td>
        <td>{run.locationRun}</td>
        <td>{run.distance}</td>
        <RunStatus status={run.status} paidClick={() => onPaidClick(run._id)} />
        <td>
          <Button onClick={() => onDeleteClick(run._id)} variant="danger">
            Снять запись
          </Button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      {!profile ? (
        <Spinner />
      ) : (
        <div className="table-responsive">
          <table className="table hoverTable">
            <thead>
              <tr>
                <th>Забег</th>
                <th>Дата</th>
                <th>Город</th>
                <th>Дистанция(км)</th>
                <th>Статус</th>
                <th />
              </tr>
              {BookedRuns}
            </thead>
          </table>
        </div>
      )}
    </Fragment>
  );
};

BookingRunTable.propTypes = {
  paidBookedRun: PropTypes.func.isRequired,
  deleteBookedRun: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  propsErrors: PropTypes.object,
  isSubmited: PropTypes.bool.isRequired
};
export default BookingRunTable;

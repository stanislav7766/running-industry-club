import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import StatusRun from './StatusRun';
import PropTypes from 'prop-types';
import {
  getCurrentProfile,
  deleteBookedRun,
  paidBookedRun
} from '../../../actions/profileActions';

class OwnBookedRuns extends Component {
  onDeleteClick = id => this.props.deleteBookedRun(id);
  onPaidClick = id => this.props.paidBookedRun(id);

  componentDidMount = () => this.props.getCurrentProfile();
  componentWillReceiveProps = nextProps =>
    this.props.isSubmited !== nextProps.isSubmited &&
    this.props.getCurrentProfile();

  render() {
    const { profile } = this.props.profile;
    const BookedRuns =
      profile &&
      profile.bookedRuns &&
      profile.bookedRuns.map(run => (
        <tr key={run._id}>
          <td>{run.nameRun}</td>
          <td>{run.date}</td>
          <td>{run.locationRun}</td>
          <td>{run.distance}</td>
          <StatusRun
            status={run.status}
            paidClick={this.onPaidClick.bind(this, run._id)}
          />
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, run._id)}
              className="btn btn-danger"
            >
              Снять запись
            </button>
          </td>
        </tr>
      ));

    return (
      <div>
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
      </div>
    );
  }
}

OwnBookedRuns.propTypes = {
  paidBookedRun: PropTypes.func.isRequired,
  deleteBookedRun: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteBookedRun, paidBookedRun }
)(OwnBookedRuns);

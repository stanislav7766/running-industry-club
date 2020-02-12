import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../../components/common/Spinner';
import './AllRuns.css';
import { Container, Row } from 'react-bootstrap';
import RunCard from '../../components/run-card';

const AllRuns = ({ getCurrentProfile, profile, loading }) => {
  const fetchCurrentProfile = useCallback(
    async () => await getCurrentProfile(),
    [getCurrentProfile]
  );

  useEffect(() => {
    fetchCurrentProfile();
  }, [fetchCurrentProfile]);

  const runsSorted =
    profile && profile.runs
      ? profile.runs.sort((a, b) => new Date(b.date) - new Date(a.date))
      : null;

  const RunsContent =
    runsSorted &&
    runsSorted.map(card => <RunCard run={card} key={card._id}></RunCard>);

  return (
    <div className="all-runs">
      <Container fluid={true}>
        <Row>
          <Link
            to="/own-profile"
            className="btn btn-block btn-secondary w-25 mx-auto mb-4 mt-4"
          >
            Вернуться
          </Link>
        </Row>

        {loading ? (
          <Row
            style={{
              display: 'block'
            }}
          >
            <Spinner />
          </Row>
        ) : (
          <Row> {RunsContent}</Row>
        )}
      </Container>
    </div>
  );
};
AllRuns.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool
};
const mapStateToProps = state => ({
  loading: state.profile.loading,
  profile: state.profile.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(AllRuns);

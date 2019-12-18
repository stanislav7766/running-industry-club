import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../../../actions/profileActions';
import Spinner from '../../../common/Spinner';
import './AllRuns.css';
import { Container, Row, Col } from 'react-bootstrap';
import CardRun from './CardRun';

const AllRuns = props => {
  const { profile, loading } = props.profile;
  const isExistProfile = !profile || loading;

  useEffect(() => {
    const fetchCurrentProfile = async () => await props.getCurrentProfile();
    fetchCurrentProfile();
  }, []);

  const runsSorted =
    !isExistProfile && profile.runs
      ? profile.runs.sort((a, b) => new Date(b.date) - new Date(a.date))
      : null;

  const RunsContent = isExistProfile ? (
    <Spinner />
  ) : (
    <Row>
      {runsSorted &&
        runsSorted.map(card => <CardRun run={card} key={card._id}></CardRun>)}
    </Row>
  );
  return (
    <div id="all-runs">
      <Container fluid={true}>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <Link
              to="/own-profile"
              className="btn btn-block btn-secondary mb-3 w-25 mx-auto"
            >
              Вернуться
            </Link>
          </Col>
          {useMemo(
            () => (
              <Col xs={12}>{RunsContent}</Col>
            ),
            [runsSorted]
          )}
        </Row>
      </Container>
    </div>
  );
};
AllRuns.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile })(AllRuns);

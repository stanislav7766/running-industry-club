import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect
} from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  getCurrentProfile,
  deleteAccount,
  deleteRun
} from '../../actions/profileActions';
import ProfileActions from '../../components/profile-actions';
import RunsTable from '../../components/runs-table';
import Spinner from '../../components/common/Spinner';
import logoFull from '../../assets/logo-full.png';
import preparePace from '../../utils/preparePace';
import './OwnProfile.css';

const OwnProfile = props => {
  const indent = window.innerHeight * 0.1;
  const [sizeDashboardImage, setSizeDashboardImage] = useState({
    width: window.innerWidth,
    height: window.innerWidth / 4
  });

  const {
    auth: { user },
    profile: { profile, loading },
    getCurrentProfile
  } = props;
  const isProfileEmpty = !!(profile && Object.keys(profile).length === 0);
  const isRunsEmpty = !!(profile && Object.keys(profile.runs).length === 0);
  const styleDashboardImage = {
    marginTop: `${indent}px`,
    marginBottom: `${indent}px`,
    width: `${sizeDashboardImage.width}px`,
    height: `${sizeDashboardImage.height}px`
  };
  const fetchCurrentProfile = useCallback(
    async () => await getCurrentProfile(),
    [getCurrentProfile]
  );

  useEffect(() => {
    fetchCurrentProfile();
  }, [fetchCurrentProfile]);

  useLayoutEffect(() => {
    const updateSize = () =>
      setSizeDashboardImage({
        width: window.innerWidth,
        height: window.innerWidth / 4
      });
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const onDeleteClick = () => {
    props.deleteAccount();
    props.logoutUser();
    props.history.push('/');
  };

  const LinkToRuns = profile && (
    <Col xs={12}>
      <Link
        style={
          !isRunsEmpty
            ? {}
            : {
                pointerEvents: 'none'
              }
        }
        to="/all-runs"
        className="btn btn-outline-secondary btn-block mt-4"
      >
        {!isRunsEmpty ? 'Перейти к истории пробежок' : ' У вас нет пробежек'}
      </Link>
    </Col>
  );

  const bioContent =
    profile && !isProfileEmpty ? (
      <Fragment>
        <ProfileActions />
        <div className="card border-secondary">
          <div className="card-header">{profile.user.nickname}</div>
          <div className="card-body text-secondary">
            <p className="card-text">
              &bull; {profile.name}
              <br />
              &bull; {profile.user.email}
              <br />
              &bull; {profile.age}
              <br />
              &bull; {profile.location}
            </p>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <p className="font-weight-bolder display-4 mt-4">
          Привет, {user.nickname}
        </p>
        <p>Вы пока не сформировали профиль, добавьте информацию о себе</p>
        <Link to="/create-profile" className="btn btn-lg btn-secondary">
          Создать профиль
        </Link>
      </Fragment>
    );

  const totalsContent =
    profile && !isProfileEmpty ? (
      <Fragment>
        <div>
          <p className="font-weight-bolder text-center display-4 mb-0">
            {!isRunsEmpty ? profile.totalsRun.totalKM : 0}
          </p>
          <p className="text-center">Total Kilometers</p>
        </div>
        <Row>
          <Col xs={4}>
            <p className="font-weight-bolder text-center mb-0">
              {!isRunsEmpty ? profile.totalsRun.totalRun : 0}
            </p>
            <p className="text-center">Total Runs</p>
          </Col>
          <Col xs={4}>
            <p className="font-weight-bolder text-center mb-0">
              {!isRunsEmpty ? profile.totalsRun.avgDistance : 0}
            </p>
            <p className="text-center">Avg. Distance</p>
          </Col>
          <Col xs={4}>
            <p className="font-weight-bolder text-center mb-0">
              {!isRunsEmpty ? preparePace(profile.totalsRun.avgPace) : 0}
            </p>
            <p className="text-center">Avg. Pace</p>
          </Col>
          {LinkToRuns}
        </Row>
      </Fragment>
    ) : (
      <Fragment>
        <img
          style={{
            height: '150px'
          }}
          src={logoFull}
          alt="logoFull"
        />
      </Fragment>
    );

  return (
    <div className="own-profile">
      <Container fluid={true}>
        <Row>
          <Col className="px-0" xs={12}>
            <div
              className="own-profile-image main-image-template"
              style={styleDashboardImage}
            />
          </Col>
          <Container fluid={true}>
            {loading ? (
              <Spinner />
            ) : (
              <Row
                style={{
                  alignItems: 'center'
                }}
              >
                <Col xs={10} sm={10} md={4} className="mx-auto">
                  {totalsContent}
                </Col>
                <Col xs={10} sm={10} md={4} className="mx-auto">
                  {bioContent}
                </Col>
                <Col xs={10} className="mx-auto">
                  <div style={{ marginTop: `${indent}px` }} />
                  {profile && !isProfileEmpty && (
                    <RunsTable
                      deleteRun={props.deleteRun}
                      runs={profile.runs}
                    />
                  )}
                  <Button
                    variant="danger"
                    onClick={onDeleteClick}
                    className="mt-4 mb-4"
                  >
                    Удалить аккаунт
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </Row>
      </Container>
    </div>
  );
};
OwnProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteRun: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  deleteRun,
  logoutUser
})(OwnProfile);

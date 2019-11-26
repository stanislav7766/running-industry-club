import React, {
  Fragment,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
  getCurrentProfile,
  deleteAccount
} from '../../../actions/profileActions';
import ProfileActions from '../profile-actions/';
import Runs from '../happened-runs/runs';
import Spinner from '../../common/Spinner';
import './OwnProfile.css';
import logoFull from '../../../img/logo-full.png';
import preparePace from '../../common/preparePace';
const OwnProfile = props => {
  const [heightPCardBody, setHightPCardBody] = useState(0);
  const refPCardBody = useRef();
  const imgTop = window.innerHeight * 0.08;
  const [sizeDashboardImage, setSizeDashboardImage] = useState([
    window.innerWidth,
    window.innerWidth / 4
  ]);

  const { user } = props.auth;
  const { profile, loading } = props.profile;

  const isExistProfile = !profile || loading;
  useEffect(() => {
    const fetchCurrentProfile = async () => await props.getCurrentProfile();
    fetchCurrentProfile();
  }, []);
  useEffect(() => {
    setHightPCardBody(
      refPCardBody && refPCardBody.current
        ? refPCardBody.current.getBoundingClientRect().height
        : 0
    );
  });

  const onDeleteClick = () => {
    props.deleteAccount();
    props.history.push('/');
  };

  const bioContent = isExistProfile ? (
    <Spinner />
  ) : Object.keys(profile).length > 0 ? (
    <Fragment>
      <ProfileActions />

      <div className="card border-secondary mb-4">
        <div className="card-header">{profile.user.nickname}</div>
        <div
          style={{
            height: `${heightPCardBody + 30}px`
          }}
          className="card-body text-secondary"
        >
          <p ref={refPCardBody} className="card-text">
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
  const totalsContent = isExistProfile ? (
    <Spinner />
  ) : Object.keys(profile).length > 0 ? (
    <Fragment>
      <div
        style={{
          marginTop: `${imgTop}px`
        }}
      >
        <p className="font-weight-bolder text-center display-4 mb-0">
          {profile.runs.length > 0 ? profile.totalsRun.totalKM : 0}
        </p>
        <p className="text-center">Total Kilometers</p>
      </div>
      <Row>
        <Col xs={4}>
          <p className="font-weight-bolder text-center mb-0">
            {profile.runs.length > 0 ? profile.totalsRun.totalRun : 0}
          </p>
          <p className="text-center">Total Runs</p>
        </Col>
        <Col xs={4}>
          <p className="font-weight-bolder text-center mb-0">
            {profile.runs.length > 0 ? profile.totalsRun.avgDistance : 0}
          </p>
          <p className="text-center">Avg. Distance</p>
        </Col>
        <Col xs={4}>
          <p className="font-weight-bolder text-center mb-0">
            {profile.runs.length > 0
              ? preparePace(profile.totalsRun.avgPace)
              : 0}
          </p>{' '}
          <p className="text-center">Avg. Pace</p>
        </Col>
        <Col xs={12}>
          <Link
            to="/all-runs"
            className="btn btn-outline-secondary btn-block mb-4 mt-4"
          >
            Перейти к истории пробежок
          </Link>
        </Col>
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

  useLayoutEffect(() => {
    const updateSize = () =>
      setSizeDashboardImage([window.innerWidth, window.innerWidth / 4]);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return useMemo(
    () => (
      <div className="dashboard">
        <Container fluid={true}>
          <Row>
            <Col className="pad-x" xs={12}>
              <div
                className="main-image-template dashboard-image"
                style={{
                  marginTop: `${imgTop}px`,
                  marginBottom: `${imgTop}px`,

                  width: `${sizeDashboardImage[0]}px`,
                  height: `${sizeDashboardImage[1]}px`
                }}
              />
            </Col>
            <Container
              fluid={true}
              style={{
                paddingRight: '70px',
                paddingLeft: '70px'
              }}
            >
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div>{totalsContent}</div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div>{bioContent} </div>
                </Col>

                {!isExistProfile && (
                  <Col xs={12}>
                    <div
                      style={{ marginTop: `${window.innerHeight * 0.1}px` }}
                    />
                    {profile && Object.keys(profile).length > 0 && !loading ? (
                      <Runs runs={profile.runs} />
                    ) : null}
                    <button
                      onClick={onDeleteClick}
                      className="btn btn-danger mb-4"
                    >
                      Удалить аккаунт
                    </button>
                  </Col>
                )}
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
    ),
    [props.profile, sizeDashboardImage]
  );
};
OwnProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  OwnProfile
);

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../actions/authActions';
import './Header.css';
import logo from '../../../img/logo.png';
const Header = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };
  const { isAuthenticated, user } = props.auth;
  const guestLinks = (
    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      <Link className="dropdown-item" to="/login">
        Войти
      </Link>
      <Link className="dropdown-item" to="/register">
        Регистрация
      </Link>
    </div>
  );
  const authLinks = (
    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      <Link className="dropdown-item" to="/own-profile">
        {user.nickname}
      </Link>
      <Link className="dropdown-item" onClick={onLogoutClick} to="/">
        Выйти
      </Link>
    </div>
  );

  return (
    <Row>
      <Col xs={12}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <Link to="/" className="navbar-bar">
            <img className="logo-header" src={logo} alt="" />
            <div className="navbar-brand" to="/">
              Running Industry
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  Новости
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/find-friends">
                  Найти друзей
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Личный Кабинет
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
              </li>
            </ul>
          </div>
        </nav>
      </Col>
    </Row>
  );
};
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Header);

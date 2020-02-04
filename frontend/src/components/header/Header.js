import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };
  const { isAuthenticated, user } = props.auth;
  const guestLinks = (
    <Fragment>
      <NavDropdown.Item href="/login">Войти</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/register">Регистрация</NavDropdown.Item>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav.Link href="/own-profile">{user.nickname}</Nav.Link>
      <NavDropdown.Divider />
      <Nav.Link onClick={onLogoutClick} href="/">
        Выйти
      </Nav.Link>
    </Fragment>
  );

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
        <img className="logo-header" src={logo} alt="" />
        Running Industry
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/news">Новости</Nav.Link>
          <Nav.Link href="find-friends">Найти друзей</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown alignRight title="Профиль" id="collasible-nav-dropdown">
            {isAuthenticated ? authLinks : guestLinks}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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

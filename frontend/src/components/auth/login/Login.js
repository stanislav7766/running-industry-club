import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import { resetErrors } from '../../../actions/profileActions';
import './Login.css';

const Login = props => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState(props.errors);

  useEffect(() => {
    if (props.errors !== errors) setErrors(props.errors);
  }, [props.errors]);

  useMemo(() => props.resetErrors(), [props.location.pathname]);

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: inputs.email,
      password: inputs.password
    };
    props.loginUser(userData, props.history);
  };

  const mt = `${window.innerHeight / 8}px`;

  return (
    <div className="login">
      <div className="light-overlay">
        <div className="container mt-150">
          <div className="row">
            <div className="col-10 mx-auto">
              <div
                style={{
                  marginTop: mt
                }}
              >
                <Link to="/" className="btn btn-outline-light">
                  Вернуться
                </Link>
                <h1 className="display-4 text-center text-light">Вход</h1>
                <p className="lead text-center text-light">
                  Войдите в свой аккаунт
                </p>
                <form onSubmit={onSubmit}>
                  <TextFieldGroup
                    name="email"
                    type="email"
                    placeholder="Ваша Почта"
                    error={errors.email}
                    value={inputs.email}
                    onChange={onChange}
                  />
                  <TextFieldGroup
                    name="password"
                    type="password"
                    placeholder="Ваш Пароль"
                    error={errors.password}
                    value={inputs.password}
                    onChange={onChange}
                  />
                  <input
                    type="submit"
                    value="Войти"
                    className="btn btn-info btn-block mb-4 mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser, resetErrors })(Login);

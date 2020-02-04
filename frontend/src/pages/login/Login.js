import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { resetErrors } from '../../actions/profileActions';
import './Login.css';

const Login = props => {
  const [heightForm, setHeightForm] = useState(0);
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const centerVertically = {
    marginTop: `calc(50vh - ${heightForm / 2}px)`
  };

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    props.loginUser(inputs, props.history);
  };

  const heightFormRef = useCallback(
    node => node && setHeightForm(node.getBoundingClientRect().height),
    []
  );

  useEffect(() => props.errors !== errors && setErrors(props.errors), [
    props.errors
  ]);

  useMemo(() => props.resetErrors(), [props.location.pathname]);

  return (
    <div className="login main-image-template">
      <div className="light-overlay">
        <Container fluid={true}>
          <Row>
            <Col
              xs={{ span: '10', offset: '1' }}
              sm={{ span: '8', offset: '2' }}
              md={{ span: '4', offset: '7' }}
            >
              <div style={centerVertically} ref={heightFormRef}>
                <h1 className="display-5 text-center text-light">Вход</h1>
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
                  <Button
                    type="submit"
                    variant="secondary"
                    block
                    className="mb-4 mt-4"
                  >
                    Войти
                  </Button>
                </form>
                <Row
                  style={{
                    alignItems: 'center'
                  }}
                >
                  <Col>
                    <p className="pt-3 lead text-center text-light">
                      Ещё нет аккаунта?
                    </p>
                  </Col>
                  <Col>
                    <Link
                      to="/register"
                      className="btn btn-secondary btn-block"
                    >
                      Зарегистрироваться
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
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

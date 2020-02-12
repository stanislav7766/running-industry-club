import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';
import { resetErrors } from '../../actions/profileActions';
import { prepareData } from '../../utils/prepareData';
import './Register.css';

const defaultFields = [
  {
    name: 'nickname',
    value: '',
    placeholder: 'Ваш Ник'
  },
  {
    name: 'email',
    value: '',
    placeholder: 'Ваша Почта'
  },
  {
    name: 'password',
    value: '',
    type: 'password',
    placeholder: 'Задайте Пароль'
  },
  {
    name: 'password2',
    value: '',
    type: 'password',
    placeholder: 'Подтвердите Пароль'
  }
];

const Register = props => {
  const { errors: propsErrors, resetErrors } = props;

  const [heightForm, setHeightForm] = useState(0);
  const [inputs, setInputs] = useState(defaultFields);
  const [errors, setErrors] = useState({});
  const centerVertically = {
    marginTop: `calc(50vh - ${heightForm / 2}px)`
  };

  const onChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setInputs(inputs => [
      ...inputs.map(input =>
        input['name'] === name
          ? {
              ...input,
              value
            }
          : { ...input }
      )
    ]);
  };
  const onSubmit = e => {
    e.preventDefault();
    const userData = prepareData(inputs);
    props.registerUser(userData, props.history);
  };

  const Inputs = inputs.map((input, i) => (
    <TextFieldGroup
      key={i}
      placeholder={input.placeholder}
      name={input.name}
      type={input.type && input.type}
      value={input.value}
      error={errors[input.name]}
      onChange={onChange}
    />
  ));
  const heightFormRef = useCallback(
    node => node && setHeightForm(node.getBoundingClientRect().height),
    []
  );
  useEffect(() => {
    propsErrors !== errors && setErrors(propsErrors);
  }, [propsErrors, errors]);
  const unMount = useCallback(() => {
    resetErrors();
  }, [resetErrors]);

  useEffect(
    () => () => {
      unMount();
    },
    [unMount]
  );
  return (
    <div className="register main-image-template">
      <div className="light-overlay">
        <Container fluid={true}>
          <Row>
            <Col
              xs={{ span: '10', offset: '1' }}
              sm={{ span: '8', offset: '2' }}
              md={{ span: '4', offset: '1' }}
            >
              <div style={centerVertically} ref={heightFormRef}>
                <h1 className="display-5 text-center text-light">
                  Добро Пожаловать
                </h1>
                <p className="lead text-center text-light">
                  Присоединяйтесь к нашей команде, участвуйте в забегах
                </p>
                <form noValidate onSubmit={onSubmit}>
                  {Inputs}
                  <Button
                    variant="secondary"
                    type="submit"
                    block
                    className="mb-4 mt-4"
                  >
                    Зарегистрироваться
                  </Button>
                </form>

                <Row
                  style={{
                    alignItems: 'center'
                  }}
                >
                  <Col>
                    <p className="pt-3 lead text-center text-light">
                      Уже есть аккаунт?
                    </p>
                  </Col>
                  <Col>
                    <Link to="/login" className="btn btn-secondary btn-block">
                      Войти
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

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser, resetErrors })(
  Register
);

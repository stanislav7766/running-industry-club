import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import { registerUser } from '../../../actions/authActions';
import { resetErrors } from '../../../actions/profileActions';
import { prepareData } from '../../common/prepareData';
import './Register.css';
const Register = props => {
  const [inputs, setInputs] = useState([
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
      placeholder: 'Задайте Пароль'
    },
    {
      name: 'password2',
      value: '',
      placeholder: 'Подтвердите Пароль'
    }
  ]);
  const [errors, setErrors] = useState({});

  const mapInputs = arr => {
    return arr.map((obj, i) => (
      <TextFieldGroup
        key={i}
        placeholder={obj.placeholder}
        name={obj.name}
        value={obj.value}
        error={errors[obj.name]}
        onChange={onChange}
      />
    ));
  };

  useEffect(() => {
    if (props.errors !== errors) setErrors(props.errors);
  }, [props.errors]);

  useMemo(() => props.resetErrors(), [props.location.pathname]);

  const onChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setInputs(inputs => {
      const inpts = inputs.map(obj =>
        obj['name'] === name
          ? {
              ...obj,
              value: value
            }
          : { ...obj }
      );
      return [...inpts];
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    const userData = prepareData(inputs);
    props.registerUser(userData, props.history);
  };
  let Inputs = mapInputs(inputs);
  const mt = `${window.innerHeight / 8}px`;

  return (
    <div className="register">
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
                <h1 className="display-4 text-center text-light">
                  Добро Пожаловать
                </h1>
                <p className="lead text-center text-light">
                  Присоединяйтесь к нашей команде, участвуйте в забегах
                </p>
                <form noValidate onSubmit={onSubmit}>
                  {Inputs}
                  <input
                    type="submit"
                    value="Отправить"
                    className="btn btn-secondary btn-block mb-4 mt-4"
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

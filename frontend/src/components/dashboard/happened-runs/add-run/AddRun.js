import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../../common/TextAreaFieldGroup';
import { addRun, resetErrors } from '../../../../actions/profileActions';
import MapAddRun from './MapAddRun';
import './AddRun.css';

const AddRun = props => {
  const [inputs, setInputs] = useState({
    nameRun: '',
    date: '',
    locationRun: '',
    distance: '',
    time: '',
    feedback: ''
  });
  const [errors, setErrors] = useState({});
  const [coordsRun, setCoordsRun] = useState([]);

  const handleSetCoords = arr => {
    setCoordsRun(arr);
  };
  const handleSetDistance = val => {
    setInputs({ ...inputs, distance: val });
  };

  useEffect(() => {
    if (props.errors !== errors) setErrors(props.errors);
  }, [props.errors]);

  useMemo(() => props.resetErrors(), [props.location.pathname]);

  const onSubmit = e => {
    e.preventDefault();
    const runData = {
      nameRun: inputs.nameRun,
      date: inputs.date,
      locationRun: inputs.locationRun,
      distance: inputs.distance,
      time: inputs.time,
      feedback: inputs.feedback
    };
    props.addRun(runData, props.history);
  };
  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  const Maps = (
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <MapAddRun
          errors={errors}
          handleSetCoords={handleSetCoords}
          handleSetDistance={handleSetDistance}
        />
      </Col>
    </Row>
  );

  const Input = (
    <Fragment>
      <h1 className="font-weight-bold text-light header-text">
        Добавьте вашу недавнюю пробежку
      </h1>
      <h3
        className="font-weight-light text-light sub-header-text"
        style={{
          marginBottom: `50px`
        }}
      >
        Вы можете поделиться впечатлениями последнего забега
      </h3>
      <Row id="add-run-inputs">
        <Col md={{ span: 10, offset: 1 }}>
          <Link to="/own-profile" className="btn btn-secondary mb-3">
            Вернуться
          </Link>
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              placeholder="Название забега"
              info="Например: Вечерняя пробежка"
              name="nameRun"
              value={inputs.nameRun}
              onChange={onChange}
              error={errors.nameRun}
            />
            <TextFieldGroup
              placeholder="Укажите дату забега"
              name="date"
              info="mm.dd.yyyy"
              value={inputs.date}
              onChange={onChange}
              error={errors.date}
            />
            <TextFieldGroup
              placeholder="В каком городе вы бегали"
              name="locationRun"
              value={inputs.locationRun}
              onChange={onChange}
              error={errors.locationRun}
            />
            <TextFieldGroup
              placeholder="Укажите время, за которое вы пробежали"
              name="time"
              value={inputs.time}
              onChange={onChange}
              error={errors.time}
              info="Например: 00:03:30"
            />
            <TextFieldGroup
              placeholder="Укажите дистанцию, которую вы пробежали"
              name="distance"
              value={inputs.distance}
              onChange={onChange}
              error={errors.distance}
            />
            <TextAreaFieldGroup
              placeholder="Поделитесь вашими впечатлениями"
              name="feedback"
              value={inputs.feedback}
              onChange={onChange}
              error={errors.feedback}
              info="Это сообщение увидят ваши друзья"
            />
            <input
              type="submit"
              value="Добавить"
              className="btn btn-secondary btn-block mt-4"
            />
          </form>
        </Col>
      </Row>
    </Fragment>
  );
  return (
    <div className="add-run-image main-image-template" id="add-run">
      <div className="light-overlay">
        <Container fluid={true}>
          <Row
            style={{
              marginBottom: `${window.innerHeight * 0.08}px`
            }}
          >
            <Col
              style={{
                marginTop: `${window.innerHeight * 0.08}px`
              }}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              {Maps}
            </Col>
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              style={{
                marginTop: `${window.innerHeight * 0.08}px`
              }}
            >
              {Input}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

AddRun.propTypes = {
  addRun: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { addRun, resetErrors })(AddRun);

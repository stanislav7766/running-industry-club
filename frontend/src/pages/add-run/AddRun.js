import React, { useState, useEffect, useCallback } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../../components/common/TextAreaFieldGroup';
import { addRun, resetErrors } from '../../actions/profileActions';
import AddRunMap from '../../components/add-run-map';
import { prepareData } from '../../utils/prepareData';
import './AddRun.css';

const defaultFields = [
  {
    name: 'nameRun',
    value: '',
    placeholder: 'Название забега',
    info: 'Например: Вечерняя пробежка'
  },
  {
    name: 'date',
    value: '',
    info: 'mm.dd.yyyy',
    placeholder: 'Укажите дату забега'
  },
  {
    placeholder: 'В каком городе вы бегали',
    name: 'locationRun',
    value: ''
  },
  {
    placeholder: 'Укажите время, за которое вы пробежали',
    name: 'time',
    value: '',
    info: 'Например: 00:03:30'
  },
  {
    placeholder: 'Укажите дистанцию, которую вы пробежали',
    name: 'distance',
    value: ''
  },
  {
    placeholder: 'Поделитесь вашими впечатлениями',
    name: 'feedback',
    value: '',
    info: 'Это сообщение увидят ваши друзья'
  }
];

const AddRun = props => {
  const { errors: propsErrors, resetErrors } = props;
  const [inputs, setInputs] = useState(defaultFields);
  const [previewFile, setPreviewFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [heightForm, setHeightForm] = useState(0);
  const [displayMap, setDisplayMap] = useState(false);
  const isMobile = window.innerWidth < 769;

  const [mapSize] = useState(
    isMobile
      ? {
          height: window.innerWidth * 0.7,
          width: window.innerWidth * 0.7
        }
      : {
          height: window.innerWidth * 0.4,
          width: window.innerWidth * 0.4
        }
  );

  const handleSetPreview = file => setPreviewFile(file);
  const handleSetDistance = value => changeInput('distance', value);

  const changeInput = (name, value) =>
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

  const mapStyle = {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: `${isMobile ? '10%' : 0}`,
    marginBottom: `${isMobile ? '10%' : 0}`,
    height: `${mapSize.height}px`,
    width: `${mapSize.width}px`,
    borderRadius: '4px'
  };
  const centerVerticallyForm = {
    marginTop: `calc(50vh - ${heightForm / 2}px)`
  };
  const centerVerticallyMap = {
    marginTop: `calc(50vh - ${mapSize.height / 2}px)`
  };

  const heightFormRef = useCallback(
    node =>
      node &&
      propsErrors === errors &&
      setHeightForm(node.getBoundingClientRect().height),
    [errors, propsErrors]
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
  const MemoMap = (
    <AddRunMap
      mapStyle={mapStyle}
      handleSetPreview={handleSetPreview}
      handleSetDistance={handleSetDistance}
    />
  );

  const onSubmit = e => {
    e.preventDefault();
    const userData = prepareData(inputs);
    props.addRun(userData, props.history, previewFile);
  };
  const onChange = e => changeInput(e.target.name, e.target.value);

  const Inputs = inputs.map((input, i) =>
    input.name === 'feedback' ? (
      <TextAreaFieldGroup
        key={i}
        placeholder={input.placeholder}
        name={input.name}
        type={input.type && input.type}
        value={input.value}
        info={input.info}
        error={errors[input.name]}
        onChange={onChange}
      />
    ) : (
      <TextFieldGroup
        key={i}
        placeholder={input.placeholder}
        name={input.name}
        type={input.type && input.type}
        value={input.value}
        info={input.info}
        error={errors[input.name]}
        onChange={onChange}
      />
    )
  );
  return (
    <div className="add-run main-image-template">
      <div className="light-overlay">
        <a id="scroll-to-map" href={`#map-id`}>
          .
        </a>
        <Container fluid={true}>
          <Row>
            {!isMobile && <Col style={centerVerticallyMap}>{MemoMap}</Col>}
            <Col ref={heightFormRef} style={centerVerticallyForm}>
              <h1 className="font-weight-bold text-light header-text">
                Добавьте вашу недавнюю пробежку
              </h1>
              <Row>
                <Col xs={10} sm={8} md={8} className="mx-auto">
                  <Link
                    to="/own-profile"
                    className="btn btn-outline-light mt-4 mb-4"
                  >
                    Вернуться
                  </Link>
                  {isMobile && (
                    <Button
                      style={{ display: 'block' }}
                      onClick={() => setDisplayMap(!displayMap)}
                      variant="secondary"
                      className="mb-4"
                    >
                      Воспользоваться картой
                    </Button>
                  )}
                  <form onSubmit={onSubmit}>
                    {Inputs}
                    <Button
                      type="submit"
                      block
                      variant="secondary"
                      className="mt-4"
                    >
                      Добавить
                    </Button>
                  </form>
                </Col>
              </Row>
            </Col>
            {displayMap && <Col id="map-id">{MemoMap}</Col>}
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

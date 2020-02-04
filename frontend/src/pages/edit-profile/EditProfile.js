import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AvatarCard from '../../components/avatar-card';
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe
} from 'react-icons/fa';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../../components/common/TextAreaFieldGroup';
import InputGroup from '../../components/common/InputGroup';
import SelectListGroup from '../../components/common/SelectListGroup';
import Spinner from '../../components/common/Spinner';
import isEmpty from '../../utils/isEmpty';
import {
  getCurrentProfile,
  createProfile,
  resetErrors
} from '../../actions/profileActions';
import './EditProfile.css';

const mapInputs = (inputs, profile) =>
  Object.keys(inputs).reduce(
    (updated, input) => ({
      ...updated,
      [input]: input === 'email' ? profile.user[input] : profile[input]
    }),
    {}
  );
const mapSocialInputs = (inputs, { social }) =>
  Object.keys(inputs).reduce(
    (updated, input) => ({
      ...updated,
      [input]: social && social[input] ? social[input] : ''
    }),
    {}
  );

const statusOptions = [
  { label: 'В скольки забегах вы участвовали', value: 0 },
  { label: 'Ни в одном', value: 'Не в одном' },
  { label: '1-2', value: '1-2' },
  { label: '3-5', value: '3-5' },
  { label: '6-10', value: '6-10' },
  { label: 'Больше 10', value: 'Больше 10' }
];

const EditProfile = props => {
  const [inputsMapped, setInputsMapped] = useState(false);
  const [displaySocial, setDisplaySocial] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    location: '',
    age: '',
    status: '',
    bio: ''
  });
  const [socialInputs, setSocialInputs] = useState({
    website: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });
  const [croppedAvatar, setCroppedAvatar] = useState(null);

  const { profile, loading } = props;
  const isProfileEmpty = isEmpty(profile);

  useEffect(() => {
    const fetchCurrentProfile = async () => await props.getCurrentProfile();
    fetchCurrentProfile();
  }, []);

  useEffect(() => {
    if (!isProfileEmpty) {
      !inputsMapped && setInputs(mapInputs(inputs, profile));
      !inputsMapped && setSocialInputs(mapSocialInputs(socialInputs, profile));
      !inputsMapped && setInputsMapped(true);
      setErrors(props.errors);
    }
  }, [profile, props.errors]);

  useEffect(() => props.errors !== errors && setErrors(props.errors), [
    props.errors
  ]);

  useMemo(() => props.resetErrors(), [props.location.pathname]);

  const changeInput = (name, value, cb) =>
    cb(inputs => ({ ...inputs, [name]: value }));

  const onChangeSocial = e =>
    changeInput(e.target.name, e.target.value, setSocialInputs);
  const onChangeInputs = e =>
    changeInput(e.target.name, e.target.value, setInputs);

  const onSubmit = e => {
    e.preventDefault();
    props.createProfile({ ...inputs, ...socialInputs }, props.history);
  };

  const SocialInputs = (
    <div className={`social-inputs ${displaySocial && 'show mt-4'}`}>
      <InputGroup
        icon={FaGlobe}
        placeholder={'Можете указать ваш сайт'}
        name={'website'}
        value={socialInputs.website}
        onChange={onChangeSocial}
        error={errors.website}
      />
      <InputGroup
        icon={FaTwitter}
        placeholder={'Можете указать линку на ваш twitter'}
        name={'twitter'}
        value={socialInputs.twitter}
        onChange={onChangeSocial}
        error={errors.twitter}
      />
      <InputGroup
        icon={FaFacebook}
        placeholder={'Можете указать линку на ваш facebook'}
        name={'facebook'}
        value={socialInputs.facebook}
        onChange={onChangeSocial}
        error={errors.facebook}
      />
      <InputGroup
        icon={FaInstagram}
        placeholder={'Можете указать линку на ваш instagram'}
        name={'instagram'}
        value={socialInputs.instagram}
        onChange={onChangeSocial}
        error={errors.instagram}
      />
      <InputGroup
        icon={FaYoutube}
        placeholder={'Можете указать линку на ваш youtube'}
        name={'youtube'}
        value={socialInputs.youtube}
        onChange={onChangeSocial}
        error={errors.youtube}
      />
    </div>
  );

  return (
    <div className="edit-profile mt-150">
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <Row>
            <Col xs={10} md={6} className="mx-auto">
              {!isProfileEmpty && (
                <AvatarCard
                  nickname={profile.user.nickname}
                  croppedAvatar={croppedAvatar}
                  setCroppedAvatar={setCroppedAvatar}
                />
              )}
              <Link to="/own-profile" className="btn btn-light my-4">
                Вернуться
              </Link>
              <form noValidate onSubmit={onSubmit}>
                <TextFieldGroup
                  name={'name'}
                  placeholder={'ФИО'}
                  error={errors.name}
                  value={inputs.name}
                  onChange={onChangeInputs}
                />
                <TextFieldGroup
                  name={'email'}
                  placeholder={'Ваша Почта'}
                  error={errors.email}
                  value={inputs.email}
                  onChange={onChangeInputs}
                />
                <TextFieldGroup
                  name={'location'}
                  placeholder={'Местоположение'}
                  error={errors.location}
                  value={inputs.location}
                  onChange={onChangeInputs}
                  info={'Укажите откуда вы'}
                />
                <TextFieldGroup
                  name={'age'}
                  placeholder={'Ваш возраст'}
                  error={errors.age}
                  value={inputs.age}
                  onChange={onChangeInputs}
                  info={'Укажите ваш возраст'}
                />

                <SelectListGroup
                  name={'status'}
                  placeholder={'Status'}
                  error={errors.status}
                  value={inputs.status}
                  onChange={onChangeInputs}
                  options={statusOptions}
                  info={'Данная информация покажет нам ваш уровень'}
                />
                <TextAreaFieldGroup
                  name={'bio'}
                  placeholder={'Ваше био'}
                  error={errors.bio}
                  value={inputs.bio}
                  onChange={onChangeInputs}
                  info={'Кратко запишите информацию о вас'}
                />
                <Button
                  onClick={() => setDisplaySocial(!displaySocial)}
                  variant="light"
                >
                  Социальные Сети
                </Button>

                {SocialInputs}

                <Button type="submit" block className="bg-blue mt-4">
                  Изменить
                </Button>
              </form>
              <div />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
EditProfile.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.profile.loading,
  profile: state.profile.profile,
  errors: state.errors
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  createProfile,
  resetErrors
})(EditProfile);

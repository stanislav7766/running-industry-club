import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';
import isEmpty from '../../validation/isEmpty';
import {
  getCurrentProfile,
  createProfile,
  resetErrors
} from '../../../actions/profileActions';

const defaultInputsFromState = (profile, user) => ({
  name: !isEmpty(profile.name) ? profile.name : '',
  email: !isEmpty(user.email) ? user.email : '',
  nickname: !isEmpty(user.nickname) ? user.nickname : '',
  status: !isEmpty(profile.status) ? profile.status : '',
  location: !isEmpty(profile.location) ? profile.location : '',
  age: !isEmpty(profile.age) ? profile.age : '',
  bio: !isEmpty(profile.bio) ? profile.bio : '',
  website:
    !isEmpty(profile.social) && !isEmpty(profile.social.website)
      ? profile.social.website
      : '',
  twitter:
    !isEmpty(profile.social) && !isEmpty(profile.social.twitter)
      ? profile.social.twitter
      : '',
  facebook:
    !isEmpty(profile.social) && !isEmpty(profile.social.facebook)
      ? profile.social.facebook
      : '',
  youtube:
    !isEmpty(profile.social) && !isEmpty(profile.social.youtube)
      ? profile.social.youtube
      : '',
  instagram:
    !isEmpty(profile.social) && !isEmpty(profile.social.instagram)
      ? profile.social.instagram
      : '',
  defaultInputsFilled: true
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultInputsFilled: false,
      displaySocialInputs: false,
      nickname: '',
      email: '',
      name: '',
      location: '',
      bio: '',
      age: '',
      status: '',
      website: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }
  componentDidMount = () => this.props.getCurrentProfile();

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;
      const { user } = nextProps.auth;
      return nextProps.errors !== prevState.errors
        ? {
            ...(!prevState.defaultInputsFilled
              ? defaultInputsFromState(profile, user)
              : {}),
            errors: nextProps.errors
          }
        : null;
    } else return null;
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    nextProps.profile !== this.props.profile ||
    nextProps.errors !== this.props.errors ||
    nextState !== this.state
      ? true
      : false;

  componentWillUnmount = () => this.props.resetErrors();

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      nickname: this.state.nickname,
      age: this.state.age,
      email: this.state.email,
      location: this.state.location,
      bio: this.state.bio,
      status: this.state.status,
      website: this.state.website,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      facebook: this.state.facebook,
      youtube: this.state.youtube
    };
    this.props.createProfile(userData, this.props.history);
  };
  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: 'В скольки забегах вы участвовали', value: 0 },
      { label: 'Ни в одном', value: 'Не в одном' },
      { label: '1-2', value: '1-2' },
      { label: '3-5', value: '3-5' },
      { label: '6-10', value: '6-10' },
      { label: 'Больше 10', value: 'Больше 10' }
    ];
    let SocialInputs = displaySocialInputs ? (
      <div>
        <TextFieldGroup
          placeholder="Вебсайт"
          name="website"
          value={this.state.website}
          onChange={this.onChange}
          error={errors.website}
          info="Укажите ваш сайт , если такой имеется"
        />
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
        />
        <InputGroup
          placeholder="YouTube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
        />
      </div>
    ) : null;

    return (
      <div className="fill-form">
        <div className="container mt-150">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="card card-body bg-info text-white">
                <h1 className="display-4 text-center">{this.state.nickname}</h1>
                <p className="lead text-center">
                  Вы можете изменить свои данные
                </p>
              </div>

              <a href="/own-profile" className="btn btn-light my-3">
                Вернуться
              </a>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  type="text"
                  placeholder="ФИО"
                  error={errors.name}
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="email"
                  type="text"
                  placeholder="Ваша Почта"
                  error={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Местоположение"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Укажите откуда вы"
                />
                <TextFieldGroup
                  placeholder="Ваш возраст"
                  name="age"
                  value={this.state.age}
                  onChange={this.onChange}
                  error={errors.age}
                  info="Укажите ваш возраст"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Данная информация покажет нам ваш уровень"
                />
                <TextAreaFieldGroup
                  placeholder="Ваше био"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Кратко запишите информацию о вас"
                />
                <div
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="mb-3"
                >
                  <button type="button" className="btn btn-light">
                    Социальные Сети
                  </button>
                </div>
                {SocialInputs}
                <input
                  type="submit"
                  value="Изменить"
                  className="btn btn-info btn-block mt-4 mb-50"
                />
              </form>
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  createProfile,
  resetErrors
})(withRouter(EditProfile));

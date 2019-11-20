import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { createProfile, resetErrors } from '../../../actions/profileActions';
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      name: '',
      location: '',
      age: '',
      bio: '',
      status: '',
      website: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps = (nextProps, prevState) =>
    nextProps.errors !== prevState.errors
      ? {
          errors: nextProps.errors
        }
      : null;
  componentWillUnmount = () => this.props.resetErrors();

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      location: this.state.location,
      age: this.state.age,
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
              <a href="/" className="btn btn-light">
                Вернуться
              </a>
              <h1 className="display-4 text-center">Создайте профиль</h1>
              <p className="lead text-center">
                Присоединяйтесь к нашей команде, участвуйте в забегах
              </p>
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
                  value="Создать профиль"
                  className="btn btn-info btn-block mt-4 mb-50"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, resetErrors }
)(CreateProfile);

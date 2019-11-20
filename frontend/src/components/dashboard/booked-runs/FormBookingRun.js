import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectListGroup from '../../common/SelectListGroup';
import { resetErrors, bookingRun } from '../../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';
class FormBookingRun extends Component {
  constructor() {
    super();
    this.state = {
      nameRun: '',
      date: '',
      locationRun: '',
      distance: '',
      status: '',
      errors: {}
    };
    this.baseState = this.state;
  }
  resetForm = () => {
    this.setState(this.baseState);
  };
  static getDerivedStateFromProps = (nextProps, prevState) =>
    nextProps.errors !== prevState.errors
      ? {
          errors: nextProps.errors
        }
      : null;

  successUpdate = () => {
    isEmpty(this.state.errors) && this.resetForm();
    isEmpty(this.state.errors) && this.props.changeIsSubmited();
  };

  componentWillUnmount = () => this.props.resetErrors();

  onSubmit = async e => {
    e.preventDefault();
    const bookingData = {
      nameRun: this.state.nameRun,
      date: this.state.date,
      locationRun: this.state.locationRun,
      distance: this.state.distance,
      status: this.state.status
    };
    await this.props.bookingRun(bookingData);
    this.successUpdate();
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { errors } = this.state;
    const options1 = [
      { label: 'Выберете забег', value: 0 },
      { label: 'Around The World', value: 'Around The World' },
      { label: 'Walking The World', value: 'Walking The World' }
    ];
    const options2 = [
      { label: 'Выберете город для забега', value: 0 },
      { label: 'Киев', value: 'Киев' },
      { label: 'Львов', value: 'Львов' }
    ];
    const options3 = [
      { label: 'Укажите дату забега', value: 0 },
      { label: '11/11/19 13:00', value: `${new Date('11/13/2019 13:00')}` },
      { label: '12/11/19 13:00', value: `${new Date('12/13/2019 13:00')}` },
      { label: '13/11/19 13:00', value: `${new Date('13/13/2019 13:00')}` },
      { label: '14/11/19 13:00', value: `${new Date('14/13/2019 13:00')}` },
      { label: '15/12/19 13:00', value: `${new Date('15/13/2019 13:00')}` }
    ];
    const options4 = [
      { label: 'Укажите дистанцию забега(км)', value: 0 },
      { label: '2', value: '2' },
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '21', value: '21' },
      { label: '42', value: '42' }
    ];
    const options5 = [
      { label: 'Желаете сразу оплатить участие в забеге?', value: 0 },
      { label: 'Да, конечно', value: 'paid' },
      {
        label: 'Нет, оплачу в течении 48 часов',
        value: 'not_paid'
      }
    ];
    return (
      <div className="booking-run">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Название забега"
                  name="nameRun"
                  value={this.state.nameRun}
                  onChange={this.onChange}
                  options={options1}
                  error={errors.nameRun}
                />
                <SelectListGroup
                  placeholder="Выберете город"
                  name="locationRun"
                  value={this.state.locationRun}
                  onChange={this.onChange}
                  options={options2}
                  error={errors.locationRun}
                />
                <SelectListGroup
                  placeholder="Дата забега"
                  name="date"
                  value={this.state.date}
                  onChange={this.onChange}
                  options={options3}
                  error={errors.date}
                />
                <SelectListGroup
                  placeholder="Укажите дистанцию выбранного забега"
                  name="distance"
                  value={this.state.distance}
                  onChange={this.onChange}
                  options={options4}
                  error={errors.distance}
                />

                <SelectListGroup
                  placeholder="Желаете сразу оплатить участие в забеге?"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options5}
                  error={errors.status}
                />

                <input
                  type="submit"
                  value="Записаться"
                  className="btn btn-info btn-block mt-4 mb-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FormBookingRun.propTypes = {
  resetErrors: PropTypes.func.isRequired,
  bookingRun: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { resetErrors, bookingRun }
)(FormBookingRun);

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SelectListGroup from '../common/SelectListGroup';
import isEmpty from '../../utils/isEmpty';
import { prepareData } from '../../utils/prepareData';

const defaultFields = [
  {
    name: 'nameRun',
    value: '',
    placeholder: 'Название забега',
    options: [
      { label: 'Выберете забег', value: 0 },
      { label: 'Around The World', value: 'Around The World' },
      { label: 'Walking The World', value: 'Walking The World' }
    ]
  },
  {
    name: 'locationRun',
    value: '',
    options: [
      { label: 'Выберете город для забега', value: 0 },
      { label: 'Киев', value: 'Киев' },
      { label: 'Львов', value: 'Львов' }
    ]
  },
  {
    name: 'date',
    value: '',
    placeholder: 'Дата забега',
    options: [
      { label: 'Укажите дату забега', value: 0 },
      { label: '11/11/19 13:00', value: `${new Date('11/13/2019 13:00')}` },
      { label: '12/11/19 13:00', value: `${new Date('12/13/2019 13:00')}` },
      { label: '13/11/19 13:00', value: `${new Date('13/13/2019 13:00')}` },
      { label: '14/11/19 13:00', value: `${new Date('14/13/2019 13:00')}` },
      { label: '15/12/19 13:00', value: `${new Date('15/13/2019 13:00')}` }
    ]
  },
  {
    name: 'distance',
    value: '',
    options: [
      { label: 'Укажите дистанцию забега(км)', value: 0 },
      { label: '2', value: '2' },
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '21', value: '21' },
      { label: '42', value: '42' }
    ]
  },
  {
    name: 'status',
    value: '',
    options: [
      { label: 'Желаете сразу оплатить участие в забеге?', value: 0 },
      { label: 'Да, конечно', value: 'paid' },
      {
        label: 'Нет, оплачу в течении 48 часов',
        value: 'not_paid'
      }
    ]
  }
];

const BookingRunForm = ({
  propsErrors,
  changeIsSubmited,
  resetErrors,
  location,
  bookingRun
}) => {
  const [inputs, setInputs] = useState(defaultFields);
  const [errors, setErrors] = useState({});

  const resetForm = () => setInputs(defaultFields);

  useEffect(() => propsErrors !== errors && setErrors(propsErrors), [
    propsErrors
  ]);
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

  const Inputs = inputs.map((input, i) => (
    <SelectListGroup
      key={i}
      placeholder={input.placeholder}
      name={input.name}
      type={input.type && input.type}
      value={input.value}
      options={input.options}
      error={errors[input.name]}
      onChange={onChange}
    />
  ));

  const successUpdate = () => {
    if (isEmpty(errors)) {
      resetForm();
      changeIsSubmited();
    }
  };

  useMemo(() => resetErrors(), [location.pathname]);

  const onSubmit = async e => {
    e.preventDefault();
    const userData = prepareData(inputs);

    await bookingRun(userData);
    successUpdate();
  };

  return (
    <form onSubmit={onSubmit}>
      {Inputs}
      <Button type="submit" block className="bg-blue mt-4 mb-4">
        Записаться
      </Button>
    </form>
  );
};

BookingRunForm.propTypes = {
  resetErrors: PropTypes.func.isRequired,
  bookingRun: PropTypes.func.isRequired,
  propsErrors: PropTypes.object.isRequired
};

export default BookingRunForm;

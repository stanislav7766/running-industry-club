import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange
}) => (
  <div className="form-group">
    <textarea
      type={type}
      className={`form-control  ${error && 'is-invalid'}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error} </div>}
    {info && <small className="form-text text-white"> {info}</small>}
  </div>
);
TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
TextAreaFieldGroup.defaultProps = {
  type: 'text'
};
export default TextAreaFieldGroup;

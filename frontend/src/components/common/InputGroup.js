import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon: IconComponent,
  type,
  onChange
}) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        {IconComponent && <IconComponent />}
      </span>
    </div>
    <input
      type={type}
      className={`form-control ${error && 'is-invalid'}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error} </div>}
  </div>
);
InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;

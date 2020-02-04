import React from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './AdjustBar.css';

export default ({ min, max, step, value, onChange }) => (
  <InputRange
    formatLabel={_ => ``}
    minValue={min}
    maxValue={max}
    step={step}
    value={value}
    onChange={onChange}
  />
);

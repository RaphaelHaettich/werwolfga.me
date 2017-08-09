/*
*   Required Props:
*   up: function()
*   down: function()
*   count: number/string
*/

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Styles from './style.css.js';

const InputCounter = ({ up, down, count, }) => (
  <div>
    <FlatButton
      role="button"
      tabIndex={0}
      style={Styles.buttonStyle}
      labelStyle={Styles.buttonLabelStyle}
      onClick={() => {
        down();
      }}
      label="−"
      primary
    />
    <span style={Styles.counter}>
      {count}
    </span>
    <FlatButton
      role="button"
      tabIndex={0}
      style={Styles.buttonStyle}
      labelStyle={Styles.buttonLabelStyle}
      onClick={() => {
        up();
      }}
      label="+"
      primary
    />
  </div>
);

export default InputCounter;

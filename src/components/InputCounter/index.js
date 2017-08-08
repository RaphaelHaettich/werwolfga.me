/*
*   Required Props:
*   up: function()
*   down: function()
*   count: number/string
*/

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Styles from './style.css.js';

const inputCounter = ({ up, down, count }) => {
  return (
    <div>
      <FlatButton
        style={Styles.buttonStyle}
        labelStyle={Styles.buttonLabelStyle}
        onClick={() => {
          down();
        }}
        label="−"
        primary={true}
      />
      <label style={Styles.counter}>
        {count}
      </label>
      <FlatButton
        style={Styles.buttonStyle}
        labelStyle={Styles.buttonLabelStyle}
        onClick={() => {
          up();
        }}
        label="+"
        primary={true}
      />
    </div>
  );
};

export default inputCounter;

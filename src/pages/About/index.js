import React, { Component, } from 'react';
import SimpleState from 'react-simple-state';
import RaisedButton from 'material-ui/RaisedButton';
import Github from '../../components/SvgIcons/Github';
import Styles from './style.css.js';

const simpleState = new SimpleState();

export default class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    simpleState.evoke('loader', false);
  }
  render() {
    return (
      <div>
        <h3 style={Styles.textCenter}>About</h3>
        <p style={Styles.textCenter}>
          Created by Raphael Hättich 
        </p> 
        <p style={Styles.textCenter}>
          2017
        </p>
        <p style={Styles.textCenter}>
          MIT License
        </p>
        <br />
        <RaisedButton
          style={Styles.centeredHorizontal}
          href="https://github.com/RaphaelHaettich/werwolfga.me/"
          target="_blank"
          label="Github Link"
          primary
          icon={<Github />}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Styles from './style.css.js';
import SimpleState from 'react-simple-state';
import { base } from '../../config/constants';
import { fetch } from '../../helpers/dbcalls';
const simpleState = new SimpleState();

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null
    };
  }
  componentDidMount() {
    simpleState.evoke('loader', true);
    const userId = base.app().INTERNAL.getUid();

    let name = new Promise((resolve, reject) => {
      const collection = 'users/' + userId;
      fetch(resolve, reject, collection);
    });

    name.then(data => {
      this.setState({ displayName: data[0].displayName });
      simpleState.evoke('loader', false);
    });
  }
  componentWillUnmount() {
    simpleState.evoke('loader', true);
  }
  render() {
    return (
      <div>
        <h2 style={Styles.notSelectable}>
          Hi {this.state.displayName}
        </h2>
        {window.matchMedia('(max-width: 361px)').matches === true
          ? <div style={Styles.centeredSmallScreen}>
            <Link style={Styles.buttonPaddingRight} to="/create">
              <RaisedButton label="Create" primary />
            </Link>
            <Link to="/join">
              <RaisedButton label="Join" primary />
            </Link>
          </div>
          : <div style={Styles.centered}>
            <Link style={Styles.buttonPaddingRight} to="/create">
              <RaisedButton label="Create" primary />
            </Link>
            <Link to="/join">
              <RaisedButton label="Join" primary />
            </Link>
          </div>}
      </div>
    );
  }
}

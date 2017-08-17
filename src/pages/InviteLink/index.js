import React, { Component, } from 'react';


export default class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    // get url params
    const urlParamId = location.search.split('=')[1];
    if (urlParamId) {
      // set params to localstorage
      localStorage.setItem('urlParamId', urlParamId);
    }
    this.props.history.push('join');
  }
  render() {
    return (
      <div />
    );
  }
}

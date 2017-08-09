import React, { Component, } from 'react';


export default class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    console.warn(React);
    const urlParamId = location.search.split('=')[1];
    if (urlParamId) {
      localStorage.setItem('urlParamId', urlParamId);
    }
    console.warn(this);
    this.props.history.push('Join');
  }
  render() {
    return (
      <div />
    );
  }
}

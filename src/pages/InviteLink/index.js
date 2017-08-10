import React, { Component, } from 'react';


export default class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const urlParamId = location.search.split('=')[1];
    if (urlParamId) {
      localStorage.setItem('urlParamId', urlParamId);
    }
    this.props.history.push('Join');
  }
  render() {
    return (
      <div />
    );
  }
}

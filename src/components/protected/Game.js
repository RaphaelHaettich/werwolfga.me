import React, { Component } from 'react'

export default class game extends Component {
  render () {
    return (
      <div>
        game. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
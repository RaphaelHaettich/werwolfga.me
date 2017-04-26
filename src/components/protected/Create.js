import React, { Component } from 'react'
import Cards from './Cards'
import Joinedcounter from './Joinedcounter'
import { post } from '../../helpers/dbcalls'
import { base } from '../../config/constants'


class create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lobbyId: "",
      lobbyKey: "",
      loading: true
    };
  }
  componentDidMount() {
    var self = this;

    let inviteCode = Math.floor(Math.random() * 900000) + 100000
    const userId = base.app().INTERNAL.getUid()
    let collection = 'activegame'

    let createLobby = new Promise((resolve, reject) => {
      post(resolve, reject, inviteCode, userId, collection);
    })
    createLobby.then((key) => {
      self.setState({
        lobbyId: inviteCode,
        lobbyKey: key,
        loading: false
      });
    }).catch(function (error) {
      alert("Error: " + error);
    });
  }

  render() {
    return (
      <div>
        {this.state.loading === true
          ? <h3>
            LOADING...
            </h3>
          :
          <div>
            <h3>
              Available Cards
        </h3>
            <Cards />
            <h3>Lobby ID: {this.state.lobbyId}</h3>
            <Joinedcounter lobbyKey={this.state.lobbyKey}/>
          </div>
        }
      </div>
    )
  }
}

export default create

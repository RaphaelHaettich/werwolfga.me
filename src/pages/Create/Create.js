import React, {Component} from 'react'
import Cards from '../../components/Cards/Cards'
import {post} from '../../helpers/dbcalls'
import {base} from '../../config/constants'
import RaisedButton from 'material-ui/RaisedButton'
import Deleteandroutebutton from '../../components/Deleteandroutebutton/Deleteandroutebutton'
import Counterlabel from '../../components/Counterlabel/Counterlabel'

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
    const userId = base
      .app()
      .INTERNAL
      .getUid()
    let collection = 'activegame'
    let data = {
      code: inviteCode,
      host: userId,
      state: 'draft'
    }
    let createLobby = new Promise((resolve, reject) => {
      post(resolve, reject, data, collection);
    })
    createLobby.then((key) => {
      self.setState({lobbyId: inviteCode, lobbyKey: key, loading: false});
    })
      .catch(function (error) {
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
          : <div>
            <h3>
              Available Cards
            </h3>
            <Cards dbReference={'/cards'}/>
            <h3>Lobby ID: {this.state.lobbyId}</h3>
            <Counterlabel
              labelText={"Joined People: "}
              dbReference={'activegame/' + this.state.lobbyKey + '/memberarray/'}/>
            <RaisedButton label="Start" primary={true}/>
            <Deleteandroutebutton
              route={"/main"}
              labelText={"Cancel"}
              dbReference={'activegame/' + this.state.lobbyKey}/>
          </div>
}
      </div>
    )
  }
}

export default create
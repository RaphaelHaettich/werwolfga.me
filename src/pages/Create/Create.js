import React, {Component} from 'react'
import Cards from '../../components/Cards/Cards'
import {push} from '../../helpers/dbcalls'
import {base} from '../../config/constants'
import Deleteandroutebutton from '../../components/Deleteandroutebutton/Deleteandroutebutton'
import Writeandroutebutton from '../../components/Writeandroutebutton/Writeandroutebutton'
import Counterlabel from '../../components/Counterlabel/Counterlabel'
import Styles from './Create.css.js'

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
    const userId = base
      .app()
      .INTERNAL
      .getUid()
    //functions to call
    let createLobby = () => {
      const inviteCode = Math.floor(Math.random() * 900000) + 100000
      let promise = new Promise((resolve, reject) => {
        let collection = 'activegame'
        let data = {
          code: inviteCode,
          host: userId,
          state: 'draft'
        }
        push(resolve, reject, data, collection);
      })
      promise.then((data) => {
        self.setState({lobbyId: inviteCode, lobbyKey: data.key, loading: false});
      }).catch(function (error) {
        console.log(error);
      });
    }

    //functions to execute at start
    let hostExists = new Promise((resolve, reject) => {
      base
        .fetch('activegame/', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'host',
          equalTo: userId
        }
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          //handle error
        })
    })
    hostExists.then((data) => {
      if (data.length > 0) {
        console.log(data[0])
        if(data[0].state === "ready"){
          this.props.history.push("gameadmin")
        }else{
          this.setState({lobbyId: data[0].code, lobbyKey: data[0].key, loading: false});
        }
      } else {
        createLobby();
      }
    })
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
            <div style={Styles.centered}>
              <h3>Lobby ID: {this.state.lobbyId}</h3>
              <Counterlabel
                labelText={"Joined People: "}
                dbReference={'activegame/' + this.state.lobbyKey + '/memberarray/'}
                state={'count'}/>
              <Writeandroutebutton
                route={"/main"}
                labelText={"Start"}
                dbReference={'activegame/' + this.state.lobbyKey}
                dialog={this.refs}
                />
              <Deleteandroutebutton
                route={"/main"}
                labelText={"Cancel"}
                dbReference={'activegame/' + this.state.lobbyKey}
                removeState={'count'}/>
            </div>
          </div>
}
      </div>
    )
  }
}

export default create
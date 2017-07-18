import React, {Component} from 'react';
import Cards from '../../components/Cards/Cards';
import {push, post, update} from '../../helpers/dbcalls';
import {base} from '../../config/constants';
import Deleteandroutebutton from '../../components/Deleteandroutebutton/Deleteandroutebutton';
import Counterlabel from '../../components/Counterlabel/Counterlabel';
import Styles from './Create.css.js';
import RaisedButton from 'material-ui/RaisedButton';
import SimpleState from 'react-simple-state';
import Warningwindow from '../../components/Warningwindow/Warningwindow';
import shuffle from '../../helpers/shuffle';

const simpleState = new SimpleState()

class create extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lobbyId: "",
      lobbyKey: "",
      alertMsg: "",
      list: [],
      users: []
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
        self.setState({lobbyId: inviteCode, lobbyKey: data.key});
      })
        .catch(function (error) {
          this.setState({
            alertMsg: "Error: " + error
          })
          this
            .dialog
            .handleOpen()
          console.log(error)
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
          this.setState({
            alertMsg: "Error: " + error
          })
          this
            .dialog
            .handleOpen()
        })
    })
    hostExists.then((data) => {
      if (data.length > 0) {
        this.setState({users: data[0].memberarray});
        if (data[0].state === "ready") {
          sessionStorage.lobbyNumber = data[0].key
          this.props.history.push("gameadmin")
        } else {
          this.setState({lobbyId: data[0].code, lobbyKey: data[0].key});
        }
      } else {
        createLobby();
      }
    })
    let lang = simpleState.getState("lang")
    this.ref = base.syncState("/cards/" + lang , {
      context: this,
      state: 'list',
      asArray: true,
    });
    simpleState.subscribe('lang', this, (nextState) => {
      this.ref = base.syncState("/cards/" + nextState , {
        context: this,
        state: 'list',
        asArray: true,
      });
    });
  }

  startGame() {
    const usersObj = simpleState.getState('count')
    const cardsObj = simpleState.getState('cards')
    const cardsCount = cardsObj
      .list
      .map(function (a) {
        return a.count;
      })
      .reduce((a, b) => a + b, 0);
    const userCount = usersObj.count.length
    if ((cardsCount === userCount) && userCount > 0) {
      simpleState.evoke("loader", true)
      let cards = []
      for (let i = 0; i < cardsObj.list.length; i++) {
        for (let p = 0; p < cardsObj.list[i].count; p++) {
          cards.push(cardsObj.list[i].key)
        }
      }
      shuffle(cards)
      let memberarray = [];
      for (let i = 0; i < usersObj.count.length; i++) {
        const key = usersObj.count[i].key
        memberarray[key] = {
          "card": cards[i],
          "displayName": usersObj.count[i].displayName
        }
      }
      let updateMembers = new Promise((resolve, reject) => {
        const collection = 'activegame/' + this.state.lobbyKey + "/memberarray/"
        post(resolve, reject, memberarray, collection);
      })
      updateMembers.then((data) => {
        let setGameReady = new Promise((resolve, reject) => {
          const collection = 'activegame/' + this.state.lobbyKey
          const object = {
            state: "ready"
          }
          update(resolve, reject, object, collection);
        })
        setGameReady.then((data) => {
          simpleState.evoke("gameId", {id: this.state.lobbyKey})
          sessionStorage.lobbyNumber = this.state.lobbyKey;
          simpleState.evoke("loader", true)
          this
            .props
            .history
            .push("gameadmin")
        })
        .catch(function (error) {
          console.log(error)
        });
      })
        .catch(function (error) {
          console.log(error)
        });
    } else {
      this.setState({
        alertMsg: "You need as many players as selected cards. Please delete or add some cards or p" +
            "layers. "
      })
      this
        .dialog
        .handleOpen()
    }
  }

  render() {
    
    return (
      <div>
        <div>
          <h3>
            Available Cards
          </h3>
          <Cards cardStyle={"counter"} data={this.state.list}/>
          <div style={Styles.centeredOnlyHorizontal}>
            <h3>Lobby ID: {this.state.lobbyId}</h3>
            <Counterlabel
              labelText={"Joined People: "}
              dbReference={'activegame/' + this.state.lobbyKey + '/memberarray/'}
              state={'count'}/>
            <Warningwindow
              message={this.state.alertMsg}
              ref={(dialog) => {
              this.dialog = dialog
            }}/>
            {window.matchMedia("(max-width: 374px)").matches ===  true ?
            <div style={Styles.centeredOnlyHorizontalSmallScreen}>
              <RaisedButton
                style={Styles.buttonMarginRight}
                primary={true}
                onClick={this
                .startGame
                .bind(this)}
                label={"Start"}/>
              <Deleteandroutebutton
                route={"/main"}
                labelText={"Discard"}
                dbReference={'activegame/' + this.state.lobbyKey}
                removeState={'count'}/>
            </div>
            :
            <div>
              <RaisedButton
                style={Styles.buttonMarginRight}
                primary={true}
                onClick={this
                .startGame
                .bind(this)}
                label={"Start"}/>
              <Deleteandroutebutton
                route={"/main"}
                labelText={"Discard"}
                dbReference={'activegame/' + this.state.lobbyKey}
                removeState={'count'}/>
            </div>
            }
          </div>
        </div>

      </div>
    )
  }
}

export default create
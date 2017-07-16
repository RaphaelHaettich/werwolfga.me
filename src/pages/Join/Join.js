import React, {Component} from 'react'
import {Card, CardActions, CardTitle} from 'material-ui/Card'
import {update, fetch} from '../../helpers/dbcalls'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {base} from '../../config/constants'
import Warningwindow from '../../components/Warningwindow/Warningwindow'
import Styles from './Join.css.js'
import SimpleState from 'react-simple-state'
import {Container, Row, Col} from 'react-grid-system';

const simpleState = new SimpleState()

export default class join extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertMsg: "",
      activeSession: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userId = base
      .app()
      .INTERNAL
      .getUid()

    let getUUID = new Promise((resolve, reject) => {

      const number = this.number.input.value
      if (isNaN(number) !== true) {
        const query = {
          orderByChild: 'code',
          equalTo: Number(number)
        }
        const collection = 'activegame/'
        fetch(resolve, reject, collection, query);
      } else {
        this.setState({alertMsg: "Please insert a number!"})
        this
          .dialog
          .handleOpen()
      }
    })

    let addUser = (key) => {
      simpleState.evoke("loader", true)
      let getDisplayName = new Promise((resolve, reject) => {
        const collection = "users/" + userId
        fetch(resolve, reject, collection);
      })
      getDisplayName.then((data) => {
        let addUser = new Promise((resolve, reject) => {
          const collection = "activegame/" + key + "/memberarray/" + userId
          let object = {
            card: "null",
            displayName: data[0].displayName
          }
          update(resolve, reject, object, collection);
        })
        addUser.then((data) => {
          sessionStorage.lobbyNumber = key;
          simpleState.evoke("gameId", {id: key})
          this.setState({alertMsg: "Game found! Now waiting until creator starts game"})
          this
            .dialog
            .handleOpen()
          const collection = "activegame/" + key;
          base.listenTo(collection, {
            context: this,
            asArray: true,
            then(data) {
              if (data[3] === "ready") {
                this
                  .props
                  .history
                  .push("game")
              }
            }
          })

        })
          .catch(function (error) {
            console.log(error)
          });

      })
        .catch(function (error) {
          console.log(error)
        });

    }

    getUUID.then((data) => {
      if (data.length > 0) {
        if (data[0].memberarray === undefined) {
          addUser(data[0].key)
        } else {
          const userIdArr = Object.keys(data[0].memberarray);
          if (userIdArr.indexOf(userId) > -1 && data[0].state === "ready") {
            sessionStorage.lobbyNumber = data[0].key;
            simpleState.evoke("gameId", {id: data[0].key})
            simpleState.evoke("loader", true)
            this
              .props
              .history
              .push("game")
          } else {
            if (data[0].state === "draft") {
              addUser(data[0].key)
            } else {
              this.setState({alertMsg: "The game already started, sorry"})
              this
                .dialog
                .handleOpen()
            }
          }
        }
      } else {
        this.setState({alertMsg: "There is no game with this ID"})
        this
          .dialog
          .handleOpen()
      }
    })
  }

  joinLastGame = (e) => {
    simpleState.evoke("loader", true)
    this
      .props
      .history
      .push("game")
  }

  componentDidMount() {
    let lobbyCode = sessionStorage.lobbyNumber;
    if (lobbyCode) {
      let getGame = new Promise((resolve, reject) => {
        const collection = 'activegame/' + lobbyCode
        fetch(resolve, reject, collection);
      })
      getGame.then((data) => {
        if(data.length > 0){
          this.setState({activeSession: true})
        }
      })
    }
    simpleState.evoke("loader", false)
  }
  render() {
    return (
      <Card>
        <CardTitle title="Join Game"/>
        <CardActions>
          <form onSubmit={this.handleSubmit}>
            <Container style={Styles.marginLeft}>
              <Row>
                <Col xs={8}>
                  <TextField
                    ref={(number) => this.number = number}
                    maxLength="6"
                    type="tel"
                    hintText="123456"
                    floatingLabelText="Lobby Id"
                    fullWidth={true}/>
                </Col>
                <Col xs={4}>
                  <FlatButton type="submit" label="Join" style={Styles.buttonHeight}/>
                </Col>
              </Row>
            </Container>
          </form>
          {this.state.activeSession === true
            ? <RaisedButton
                label="Rejoin game"
                primary={true}
                style={Styles.centeredOnlyHorizontal}
                onClick={this.joinLastGame}
                />
            : <div/>
          }
        </CardActions>
        <Warningwindow
          message={this.state.alertMsg}
          ref={(dialog) => {
          this.dialog = dialog
        }}/>
      </Card>
    )
  }
}
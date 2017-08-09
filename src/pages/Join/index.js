import React, { Component, } from 'react';
import { Card, CardActions, CardTitle, } from 'material-ui/Card';
import { update, fetch, } from '../../helpers/dbcalls';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { base, } from '../../config/constants';
import WarningWindow from '../../components/WarningWindow';
import Styles from './style.css.js';
import SimpleState from 'react-simple-state';
import { Container, Row, Col, } from 'react-grid-system';

const simpleState = new SimpleState();

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMsg: '',
      activeSession: false,
    };
  }

  componentDidMount() {
    const urlParamId = localStorage.getItem('urlParamId');
    if (urlParamId) {
      localStorage.removeItem('urlParamId');
      this.joinGame(Number(urlParamId));
    }
    const lobbyCode = sessionStorage.lobbyNumber;
    if (lobbyCode) {
      const getGame = new Promise((resolve, reject) => {
        const collection = `activegame/${lobbyCode}`;
        fetch(resolve, reject, collection, {}, false);
      });
      getGame.then((data) => {
        if (data.state === 'ready') {
          this.setState({ activeSession: true, });
        }
      });
    }
    simpleState.evoke('loader', false);
  }

  componentWillUnmount() {
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  }

  joinGame = (urlParamId) => {
    const userId = base.app().INTERNAL.getUid();
    const getUUID = new Promise((resolve, reject) => {
      let number;
      if (urlParamId) {
        number = urlParamId;
      } else {
        number = this.number.input.value;
      }
      
      if (isNaN(number) !== true) {
        const query = {
          orderByChild: 'code',
          equalTo: Number(number),
        };
        const collection = 'activegame/';
        fetch(resolve, reject, collection, query);
      } else {
        this.setState({ alertMsg: 'Please insert a number!', });
        this.dialog.handleOpen();
      }
    });

    const addUser = (key) => {
      simpleState.evoke('loader', true);
      const getDisplayName = new Promise((resolve, reject) => {
        const collection = `users/${userId}`;
        fetch(resolve, reject, collection);
      });
      getDisplayName
        .then((data) => {
          const addUser = new Promise((resolve, reject) => {
            const collection = `activegame/${key}/memberarray/${userId}`;
            const object = {
              card: 'null',
              displayName: data[0].displayName,
            };
            update(resolve, reject, object, collection);
          });
          addUser
            .then(() => {
              sessionStorage.lobbyNumber = key;
              simpleState.evoke('gameId', { id: key, });
              this.setState({
                alertMsg: 'Game found! Now waiting until creator starts game',
              });
              this.dialog.handleOpen();
              const collection = `activegame/${key}`;
              this.ref = base.listenTo(collection, {
                context: this,
                asArray: true,
                then(data) {
                  if (data[3] === 'ready') {
                    this.props.history.push('game');
                  }
                },
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUUID.then((data) => {
      if (data.length > 0) {
        if (data[0].memberarray === undefined) {
          addUser(data[0].key);
        } else {
          const userIdArr = Object.keys(data[0].memberarray);
          if (userIdArr.indexOf(userId) > -1 && data[0].state === 'ready') {
            sessionStorage.lobbyNumber = data[0].key;
            simpleState.evoke('gameId', { id: data[0].key, });
            simpleState.evoke('loader', true);
            this.props.history.push('game');
          } else {
            if (data[0].state === 'draft') {
              addUser(data[0].key);
            } else {
              this.setState({ alertMsg: 'The game already started, sorry', });
              this.dialog.handleOpen();
            }
          }
        }
      } else {
        this.setState({ alertMsg: 'There is no game with this ID', });
        this.dialog.handleOpen();
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.joinGame();
  };

  joinLastGame = () => {
    simpleState.evoke('loader', true);
    this.props.history.push('game');
  };

  render() {
    return (
      <Card>
        <CardTitle style={Styles.notSelectable} title="Join Game" />
        <CardActions>
          <form onSubmit={this.handleSubmit}>
            <Container style={Styles.marginLeft}>
              <Row>
                <Col xs={8}>
                  <TextField
                    ref={number => (this.number = number)}
                    maxLength="6"
                    id="numberField"
                    type="tel"
                    hintText="123456"
                    floatingLabelText="Lobby Id"
                    fullWidth
                  />
                </Col>
                <Col xs={4}>
                  <FlatButton
                    type="submit"
                    label="Join"
                    style={Styles.buttonHeight}
                  />
                </Col>
              </Row>
            </Container>
          </form>
          {this.state.activeSession === true
            ? <RaisedButton
              role="button"
              tabIndex={0}
              label="Rejoin game"
              primary
              style={Styles.centeredOnlyHorizontal}
              onClick={this.joinLastGame}
            />
            : <div />}
        </CardActions>
        <WarningWindow
          message={this.state.alertMsg}
          ref={(dialog) => {
            this.dialog = dialog;
          }}
        />
      </Card>
    );
  }
}

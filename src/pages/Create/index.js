import React, { Component, } from 'react';
import Cards from '../../components/Cards';
import { push, post, update, } from '../../helpers/dbcalls';
import { base, } from '../../config/constants';
import DeleteAndRouteButton from '../../components/DeleteAndRouteButton';
import CounterLabel from '../../components/CounterLabel';
import ShareFAB from '../../components/ShareFAB';
import Styles from './style.css.js';
import RaisedButton from 'material-ui/RaisedButton';
import SimpleState from 'react-simple-state';
import WarningWindow from '../../components/WarningWindow';
import shuffle from '../../helpers/shuffle';

const simpleState = new SimpleState();

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: '',
      lobbyKey: '',
      alertMsg: '',
      list: [],
      users: [],
    };
  }

  componentDidMount() {
    const self = this;
    // get current user Uid
    const userId = base.app().INTERNAL.getUid();
    // Create lobby
    const createLobby = () => {
      // generate unique lobby id
      const inviteCode = Math.floor(Math.random() * 900000) + 100000;
      // push game as new object to db
      const promise = new Promise((resolve, reject) => {
        const collection = 'activegame';
        const data = {
          code: inviteCode,
          host: userId,
          state: 'draft',
        };
        push(resolve, reject, data, collection);
      });
      promise
        .then((data) => {
          // set state with data from new lobby
          self.setState({ lobbyId: inviteCode, lobbyKey: data.key, });
        })
        .catch(function(error) {
          this.setState({
            alertMsg: `Error: ${error}`,
          });
          // open error dialog
          this.dialog.handleOpen();
          console.error(error);
        });
    };

    // Code starts here
    // get active game where current user is host
    const hostExists = new Promise((resolve) => {
      base
        .fetch('activegame/', {
          context: this,
          asArray: true,
          queries: {
            orderByChild: 'host',
            equalTo: userId,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          this.setState({
            alertMsg: `Error: ${error}`,
          });
          this.dialog.handleOpen();
        });
    });
    hostExists.then((data) => {
      // if a game exists where current user is host
      if (data.length > 0) {
        // ... set state to users from found game
        this.setState({ users: data[0].memberarray, });
        // if the found game is already started
        if (data[0].state === 'ready') {
          // set lobby number to key of found game and push to gameadmin page
          sessionStorage.lobbyNumber = data[0].key;
          this.props.history.push('gameadmin');
        } else {
          // set state with data from found lobby
          this.setState({ lobbyId: data[0].code, lobbyKey: data[0].key, });
        }
      } else {
        // when no no game was found, create a lobby
        createLobby();
      }
    });
    // get language
    const lang = simpleState.getState('lang');
    // sync state to cards from db with current lang
    this.ref = base.syncState(`/cards/${lang}`, {
      context: this,
      state: 'list',
      asArray: true,
    });
    // subscribe to language, if language changes, sync to cards from new lang
    simpleState.subscribe('lang', this, (nextState) => {
      simpleState.evoke('loader', true);
      this.ref = base.syncState(`/cards/${nextState}`, {
        context: this,
        state: 'list',
        asArray: true,
      });
      simpleState.evoke('loader', false);
    });
  }

  componentWillUnmount() {
    // remove db binding
    if (this.ref) {
      base.removeBinding(this.ref);
    }
    // remove global state mounts
    simpleState.unsubscribe('lang', this);
  }

  startGame = () => {
    // get users and cards
    const usersObj = simpleState.getState('count');
    const cardsObj = simpleState.getState('cards');
    // count cards
    const cardsCount = cardsObj.list
      .map(a => a.count)
      .reduce((a, b) => a + b, 0);
    // user count
    const userCount = usersObj.count.length;
    // check if the number of users and cards is the same
    if (cardsCount === userCount && userCount > 0) {
      simpleState.evoke('loader', true);
      const cards = [];
      // Card object to array
      for (let i = 0; i < cardsObj.list.length; i++) {
        for (let j = 0; j < cardsObj.list[i].count; j++) {
          cards.push(cardsObj.list[i].key);
        }
      }
      // shuffle the cards
      shuffle(cards);
      const memberarray = [];
      // merge a user and a card
      for (let i = 0; i < usersObj.count.length; i++) {
        const key = usersObj.count[i].key;
        memberarray[key] = {
          card: cards[i],
          displayName: usersObj.count[i].displayName,
        };
      }
      // update db members with card 
      const updateMembers = new Promise((resolve, reject) => {
        const collection =
          `activegame/${this.state.lobbyKey}/memberarray/`;
        post(resolve, reject, memberarray, collection);
      });
      updateMembers
        .then(() => {
          // set game to ready
          const setGameReady = new Promise((resolve, reject) => {
            const collection = `activegame/${this.state.lobbyKey}`;
            const object = {
              state: 'ready',
            };
            update(resolve, reject, object, collection);
          });
          setGameReady
            .then(() => {
              // set state with data from new game and go to gameadmin page
              simpleState.evoke('gameId', { id: this.state.lobbyKey, });
              sessionStorage.lobbyNumber = this.state.lobbyKey;
              simpleState.evoke('loader', true);
              this.props.history.push('gameadmin');
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // error when the number of players and cards is not the same
      this.setState({
        alertMsg:
        'You need as many players as selected cards. Please delete or add some cards or p' +
        'layers. ',
      });
      this.dialog.handleOpen();
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>Available Cards</h3>
          <Cards cardStyle={'counter'} data={this.state.list} />
          <div style={Styles.centeredOnlyHorizontal}>
            <h3>
              Lobby ID: {this.state.lobbyId}
            </h3>
            <CounterLabel
              labelText={'Joined People: '}
              dbReference={
                `activegame/${this.state.lobbyKey}/memberarray/`
              }
              state={'count'}
            />
            <WarningWindow
              message={this.state.alertMsg}
              ref={(dialog) => {
                this.dialog = dialog;
              }}
            />
            { // Mediaquery for mobile devices 
              window.matchMedia('(max-width: 374px)').matches === true
                ? <div style={Styles.centeredOnlyHorizontalSmallScreen}>
                  <RaisedButton
                    role="button"
                    tabIndex={0}
                    style={Styles.buttonMarginRight}
                    primary
                    onClick={this.startGame}
                    label={'Start'}
                  />
                  <DeleteAndRouteButton
                    route={'/main'}
                    labelText={'Discard'}
                    dbReference={`activegame/${this.state.lobbyKey}`}
                    removeState={'count'}
                  />
                </div>
                : <div>
                  <RaisedButton
                    role="button"
                    tabIndex={0}
                    style={Styles.buttonMarginRight}
                    primary
                    onClick={this.startGame}
                    label={'Start'}
                  />
                  <DeleteAndRouteButton
                    route={'/main'}
                    labelText={'Discard'}
                    dbReference={`activegame/${this.state.lobbyKey}`}
                    removeState={'count'}
                  />
                </div>}
          </div>
        </div>
        <ShareFAB 
          shareText = {{
            mail: {
            // eslint-disable-next-line max-len
              body: `Join%20the%20game%20with%20this%20Link:%20${location.origin}/invitelink?id=${this.state.lobbyId}.`, 
              subject: 'Werwolf%20Game%20Invite',
            }, 
            whatsApp: {
            // eslint-disable-next-line max-len
              body: `You%20are%20invited%20to%20join%20the%20Werwolfgame%20with%20this%20Link:%20${location.origin}/invitelink?id=${this.state.lobbyId}.`,
            }, 
            clipboard: {
              url: `${location.origin}/invitelink?id=${this.state.lobbyId}`,
            },
          }}
        />
      </div>
    );
  }
}

export default Create;

import React, { Component, } from 'react';
import { fetch, post, remove, } from '../../helpers/dbcalls';
import SimpleState from 'react-simple-state';
import Cards from '../../components/Cards';
import { base, } from '../../config/constants';
import VoteList from '../../components/VoteList';
import Styles from './style.css.js';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Gavel from 'material-ui/svg-icons/action/gavel';
import Viewlist from 'material-ui/svg-icons/action/view-list';
import DeleteAndRouteButton from '../../components/DeleteAndRouteButton';
const simpleState = new SimpleState();

export default class Gameadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      gameCode: null,
      voting: false,
      votes: [],
    };
  }

  componentDidMount() {
    if (
      simpleState.getState('gameId').id === '' &&
      sessionStorage.lobbyNumber === undefined
    ) {
      this.props.history.push('main');
    } else {
      let gameId = '';
      if (simpleState.getState('gameId').id !== '') {
        gameId = simpleState.getState('gameId').id;
        sessionStorage.lobbyNumber = gameId;
      } else if (sessionStorage.lobbyNumber !== undefined) {
        gameId = sessionStorage.lobbyNumber;
      }
      const getGameCode = new Promise((resolve, reject) => {
        const collection = `activegame/${gameId}/code/`;
        const arrayBoolean = false;
        fetch(resolve, reject, collection, {}, arrayBoolean);
      });
      getGameCode.then((data) => {
        this.setState({ gameCode: data, });
      });

      this.listen2 = base.listenTo(`activegame/${gameId}/memberarray/`, {
        context: this,
        asArray: true,
        then(data) {
          const activeData = data;
          const lang = simpleState.getState('lang');
          this.getCardInfo(activeData, lang);
          simpleState.subscribe('lang', this, (nextState) => {
            simpleState.evoke('loader', true);
            this.getCardInfo(activeData, nextState);
          });
        },
      });
    }
  }

  componentWillUnmount() {
    if (this.listen1) {
      base.removeBinding(this.listen1);
    }
    if (this.listen2) {
      base.removeBinding(this.listen2);
    }
    
    // find function to check if simpleState has subscription
    const langHasSubscription = function langHasSubscription(element) {
      return element.id === 'lang' && element.subscriptions.length > 0;
    };
    // find if simple state has subscription
    if (simpleState.listeners.find(langHasSubscription)) {
      // remove global state subscribes
      simpleState.unsubscribe('lang', this);
    }
  }

  clearVote = () => {
    simpleState.evoke('loader', true);
    const gameId = sessionStorage.lobbyNumber;
    // remove vote from db
    const removeVoting = new Promise((resolve, reject) => {
      const collection = `activegame/${gameId}/voting/`;
      remove(resolve, reject, collection);
    });
    // init votes again after removal
    removeVoting.then(() => {
      this.initVote();
    });
  };

  getCardInfo = (activeData, lang) => {
    // get cards in current language from db 
    const getCardInfos = new Promise((resolve, reject) => {
      const collection = `cards/${lang}`;
      fetch(resolve, reject, collection);
    });
    getCardInfos.then((data) => {
      // create new card object from data
      for (let i = 0; i < activeData.length; i++) {
        const cardId = activeData[i].card;
        const index = data.findIndex(i => i.key === cardId);
        activeData[i].userKey = activeData[i].key;
        activeData[i].key = data[index].key;
        activeData[i].pictureback = data[index].pictureback;
        activeData[i].picturefront = data[index].picturefront;
        activeData[i].description = data[index].description;
        activeData[i].name = data[index].name;
        activeData[i].cardHeader =
          `${activeData[i].displayName}: ${data[index].name}`;
      }
      this.setState({ list: activeData, });
      simpleState.evoke('loader', false);
    });
  };

  // remove player from active game
  removePlayer = (data) => {
    simpleState.evoke('loader', true);
    const gameId = sessionStorage.lobbyNumber;
    const promise = new Promise((resolve, reject) => {
      const collection = `activegame/${gameId}/memberarray/${data}`;
      remove(resolve, reject, collection);
    });
    promise.then(() => {
      simpleState.evoke('loader', false);
    });
  };

  initVote = () => {
    simpleState.evoke('loader', true);
    // set view to vote view
    this.setState({ voting: true, });
    const data = this.state.list;
    const votingData = [];
    // create votingData object with userKey as key and displayname/votes
    for (let i = 0; i < data.length; i++) {
      votingData[data[i].userKey] = {
        displayName: data[i].displayName,
        votes: 0,
      };
    }
    const gameId = sessionStorage.lobbyNumber;
    // post voting data to db
    const postVotingData = new Promise((resolve, reject) => {
      const collection = `activegame/${gameId}/voting/data`;
      post(resolve, reject, votingData, collection);
    });
    postVotingData.then(() => {
      // listen to votes from db
      this.listen1 = base.listenTo(`activegame/${gameId}/voting/votes`, {
        context: this,
        asArray: true,
        then(votesData) {
          // get vote data
          const getVoteData = new Promise((resolve, reject) => {
            const collection = `activegame/${gameId}/voting/data/`;
            fetch(resolve, reject, collection, {}, false);
          });
          getVoteData.then((voteData) => {
            // loop throug votes and set voted for
            for (let i = 0; i < votesData.length; i++) {
              const key = votesData[i].votedForKey;
              if (voteData[key].votedFor) {
                voteData[key].votedFor =
                  `${voteData[key].votedFor}, ${votesData[i].displayName}`;
              } else {
                voteData[key].votedFor = votesData[i].displayName;
              }
              voteData[key].votes += 1;
            }
            const objectArr = Object.values(voteData);
            this.setState({ votes: objectArr, });
            simpleState.evoke('loader', false);
          });
        },
      });
    });
  };

  initList = () => {
    simpleState.evoke('loader', true);
    this.setState({ voting: false, });
  };

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h3>
          Lobbynumber: {this.state.gameCode}
        </h3>
        {this.state.voting === false
          ? <div>
            <h2>Cards in game:</h2>
            <Cards
              cardStyle={'action'}
              action={this.removePlayer}
              data={this.state.list}
            />
            <div style={Styles.centeredOnlyHorizontal}>
              <DeleteAndRouteButton
                route={'/main'}
                labelText={'Game finished'}
                dbReference={`activegame/${sessionStorage.lobbyNumber}`}
                primary
              />
            </div>
            <FloatingActionButton
              style={Styles.fab}
              onTouchTap={this.initVote}
            >
              <Gavel />
            </FloatingActionButton>
          </div>
          : <div>
            <VoteList disabled voteData={this.state.votes} />
            <RaisedButton
              role="button"
              tabIndex={0}
              style={Styles.centeredOnlyHorizontal}
              primary
              label={'Clear vote'}
              onClick={this.clearVote}
            />
            <FloatingActionButton
              style={Styles.fab}
              onTouchTap={this.initList}
            >
              <Viewlist />
            </FloatingActionButton>
          </div>}
      </div>
    );
  }
}

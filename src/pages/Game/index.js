import React, { Component, } from 'react';
import { fetch, post, } from '../../helpers/dbcalls';
import { base, } from '../../config/constants';
import FlipCard from '../../components/FlipCard';
import CheckboxList from '../../components/CheckboxList';
import SimpleState from 'react-simple-state';
import RaisedButton from 'material-ui/RaisedButton';
import WarningWindow from '../../components/WarningWindow';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Gavel from 'material-ui/svg-icons/action/gavel';
import Viewlist from 'material-ui/svg-icons/action/view-list';
import VoteList from '../../components/VoteList';
import Styles from './style.css.js';
const simpleState = new SimpleState();

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      displayName: null,
      voting: false,
      votes: [],
      voteData: [],
      voted: false,
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    // get uid of current user
    const userId = base.app().INTERNAL.getUid();
    simpleState.evoke('loader', true);
    // check if no game number in globalstate and sessionstorage
    if (
      simpleState.getState('gameId').id === '' &&
      sessionStorage.lobbyNumber === undefined
    ) {
      // when yes, go to join page
      this.props.history.push('join');
    } else {
      // when an id was found 
      // declare empty var
      let gameId;
      // check if simplestate has id
      if (simpleState.getState('gameId').id !== '') {
        // when yes set gameid to this id
        gameId = simpleState.getState('gameId').id;
        // when no check if sessionstorage has id
      } else if (sessionStorage.lobbyNumber !== undefined) {
        // when yes set gameid to this id
        gameId = sessionStorage.lobbyNumber;
      }
      // get current card from db
      const getCurrentCard = new Promise((resolve, reject) => {
        const collection = `activegame/${gameId}/memberarray/${userId}`;
        fetch(resolve, reject, collection);
      });
      getCurrentCard.then((data) => {
        // when game was found
        if (data.length > 0) {
          // set displayname
          this.setState({ displayName: data[1], });
          // get language
          const lang = simpleState.getState('lang');
          // get card info
          this.getCardInfo(data, gameId, userId, lang);
          // get new card info if lang changes
          simpleState.subscribe('lang', this, (nextState) => {
            simpleState.evoke('loader', true);
            this.getCardInfo(data, gameId, userId, nextState);
          });
        } else {
          // when no game data was found, go to join page
          this.props.history.push('join');
        }
      });
    }
  }

  componentWillUnmount() {
    // remove db mounts
    if (this.listen1) {
      base.removeBinding(this.listen1);
    }
    if (this.listen2) {
      base.removeBinding(this.listen2);
    }
    if (this.listen3) {
      base.removeBinding(this.listen3);
    }
    // remove global state subscribes
    simpleState.unsubscribe('lang', this);
  }

  listenToVoteData = () => {
    this.listen1 = base.listenTo(
      `activegame/${sessionStorage.lobbyNumber}/voting/data`,
      {
        context: this,
        asArray: true,
        then(votesData) {
          this.setState({ voteData: votesData, });
          simpleState.evoke('loader', false);
        },
      }
    );
  };

  getCardInfo = (data, gameId, userId, lang) => {
    const getCardInfos = new Promise((resolve, reject) => {
      const collection = `cards/${lang}/${data[0]}`;
      fetch(resolve, reject, collection);
    });
    getCardInfos.then((data) => {
      const cardObj = {
        description: data[0],
        name: data[1],
        pictureback: data[2],
        picturefront: data[3],
      };
      this.setState({ cards: cardObj, });
      simpleState.evoke('loader', false);
      this.listen2 = base.listenTo(
        `activegame/${gameId}/memberarray/${userId}`,
        {
          context: this,
          asArray: false,
          then(data) {
            if (data.card === undefined) {
              this.dialog.handleOpen();
            }
          },
        }
      );
    });
  };

  listenToVotes = () => {
    const gameId = sessionStorage.lobbyNumber;
    this.listen3 = base.listenTo(`activegame/${gameId}/voting/votes`, {
      context: this,
      asArray: true,
      then(votesData) {
        const getVoteData = new Promise((resolve, reject) => {
          const collection = `activegame/${gameId}/voting/data/`;
          fetch(resolve, reject, collection, {}, false);
        });
        getVoteData.then((voteData) => {
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
  };

  gameDone = () => {
    simpleState.evoke('loader', true);
    this.props.history.push('main');
  };

  changeVote = () => {
    simpleState.evoke('loader', true);
    this.listenToVoteData();
    this.setState({ voted: false, });
  };

  checkListChanged = () => {
    this.setState({ buttonDisabled: false, });
  };

  sendVote = () => {
    simpleState.evoke('loader', true);
    const userId = base.app().INTERNAL.getUid();
    this.setState({ buttonDisabled: true, });
    const gameId = sessionStorage.lobbyNumber;
    const postVotingData = new Promise((resolve, reject) => {
      const collection = `activegame/${gameId}/voting/votes/${userId}`;
      const splitString = this.checkList.state.votedkey.split('|');
      const votedKey = splitString[0];
      const displayName = splitString[1];
      const votingData = {
        displayName: this.state.displayName,
        votedForKey: votedKey,
        votedForDisplayName: displayName,
      };
      post(resolve, reject, votingData, collection);
    });
    postVotingData.then(() => {
      this.setState({ voted: true, });
      this.listenToVotes();
    });
  };

  initVote = () => {
    simpleState.evoke('loader', true);
    this.setState({ voting: true, });
    const gameId = sessionStorage.lobbyNumber;
    const userId = base.app().INTERNAL.getUid();
    const checkIfVoted = new Promise((resolve, reject) => {
      const collection = `activegame/${gameId}/voting/votes/${userId}`;
      fetch(resolve, reject, collection);
    });
    checkIfVoted.then((data) => {
      if (data.length === 0) {
        this.listenToVoteData();
      } else {
        this.setState({ voted: true, });
        this.listenToVotes();
      }
    });
  };

  initList = () => {
    simpleState.evoke('loader', true);
    this.setState({ voting: false, });
  };

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        {this.state.voting === false
          ? <div>
            <h2>
              {this.state.displayName} your card is:
            </h2>
            <FlipCard data={this.state.cards} />
            <FloatingActionButton
              style={Styles.fab}
              onTouchTap={this.initVote}
            >
              <Gavel />
            </FloatingActionButton>
          </div>
          : <div>
            {this.state.voted === false
              ? <div>
                <CheckboxList
                  votesData={this.state.voteData}
                  ref={(checkList) => {
                    this.checkList = checkList;
                  }}
                  checkListChanged={this.checkListChanged}
                />
                <RaisedButton
                  tabIndex={0}
                  role="button"
                  primary
                  style={Styles.centeredOnlyHorizontal}
                  label={'Vote!!'}
                  disabled={this.state.buttonDisabled}
                  onClick={this.sendVote}
                />
              </div>
              : <div>
                <VoteList disabled voteData={this.state.votes} />
                <RaisedButton
                  tabIndex={0}
                  role="button"
                  primary
                  style={Styles.centeredOnlyHorizontal}
                  label={'Change Vote'}
                  onClick={this.changeVote}
                />
              </div>}
            <FloatingActionButton
              style={Styles.fab}
              onTouchTap={this.initList}
            >
              <Viewlist />
            </FloatingActionButton>
          </div>}
        <WarningWindow
          message={'Game finished'}
          secondAction={this.gameDone}
          secondActionShow
          secondActionLabel={'Leave game'}
          ref={(dialog) => {
            this.dialog = dialog;
          }}
        />
      </div>
    );
  }
}

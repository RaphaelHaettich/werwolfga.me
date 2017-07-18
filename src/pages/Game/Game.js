import React, {Component} from 'react';
import {fetch, post} from '../../helpers/dbcalls';
import {base} from '../../config/constants';
import Flipcard from '../../components/Flipcard/Flipcard';
import CheckboxList from '../../components/Checkboxlist/Checkboxlist';
import SimpleState from 'react-simple-state';
import RaisedButton from 'material-ui/RaisedButton';
import Warningwindow from '../../components/Warningwindow/Warningwindow';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Gavel from 'material-ui/svg-icons/action/gavel';
import Viewlist from 'material-ui/svg-icons/action/view-list';
import Votelist from '../../components/Votelist/Votelist';
import Styles from './Game.css.js';
const simpleState = new SimpleState();


export default class Gameadmin extends Component {
  
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
    }
  }

  listenToVoteData = () => {
    base.listenTo('activegame/' + sessionStorage.lobbyNumber + "/voting/data", {
      context: this,
      asArray: true,
      then(votesData){
        this.setState({voteData: votesData})
        simpleState.evoke("loader", false)
      }
    })
  }

  listenToVotes = () => {
    const gameId = sessionStorage.lobbyNumber;
    base.listenTo('activegame/' + gameId + "/voting/votes", {
      context: this,
      asArray: true,
      then(votesData){
        let getVoteData = new Promise((resolve, reject) => {
          const collection = 'activegame/' + gameId + "/voting/data/";
          fetch(resolve, reject, collection,{}, false);
        })
        getVoteData.then((voteData) =>{
          for(let i = 0; i < votesData.length; i++){
            const key = votesData[i].votedForKey;
            if(voteData[key].votedFor){
              voteData[key].votedFor = voteData[key].votedFor + ", " + votesData[i].displayName;
            }else{
              voteData[key].votedFor = votesData[i].displayName;
            }
            voteData[key].votes += 1;
          }
          const objectArr = Object.values(voteData)
          this.setState({votes: objectArr});
          simpleState.evoke("loader", false)
        })
        
      }
    })
  }

  gameDone = () => {
    simpleState.evoke("loader", true)
    this
      .props
      .history
      .push("main")
  }

  changeVote = () => {
    simpleState.evoke("loader", true)
    this.listenToVoteData()
    this.setState({voted: false})
  }

  checkListChanged = () => {
    this.setState({buttonDisabled: false})
  }

  sendVote = () => {
    simpleState.evoke("loader", true)
    const userId = base
      .app()
      .INTERNAL
      .getUid()
    this.setState({buttonDisabled: true})
    const gameId = sessionStorage.lobbyNumber;
    let postVotingData = new Promise((resolve, reject) => {
      const collection = 'activegame/' + gameId + "/voting/votes/" + userId;
      const splitString = this.checkList.state.votedkey.split("|")
      const votedKey = splitString[0];
      const displayName = splitString[1];
      const votingData = {displayName: this.state.displayName, votedForKey: votedKey, votedForDisplayName: displayName};
      post(resolve, reject, votingData, collection);
    })
    postVotingData.then((data) => {
      this.setState({voted: true})
      this.listenToVotes();
    })
  }

  initVote = () => {
    simpleState.evoke("loader", true)
    this.setState({voting: true})
    const gameId = sessionStorage.lobbyNumber;
    const userId = base
      .app()
      .INTERNAL
      .getUid()
    let checkIfVoted = new Promise((resolve, reject) => {
      const collection = 'activegame/' + gameId + "/voting/votes/" + userId
      fetch(resolve, reject, collection);
    })
    checkIfVoted.then((data) => {
      if(data.length === 0){
        this.listenToVoteData()
      }else{
        this.setState({voted: true})
        this.listenToVotes();
      }
    })
  }

  initList = () => {
    simpleState.evoke("loader", true)
    this.setState({voting: false})
  }

  componentDidMount(){
    const userId = base
      .app()
      .INTERNAL
      .getUid()
    simpleState.evoke("loader", true)
    if(simpleState.getState("gameId").id === "" && sessionStorage.lobbyNumber === undefined){
      this.props.history.push("join")
    }else{
      let gameId = "";
      if(simpleState.getState("gameId").id !== ""){
        gameId = simpleState.getState("gameId").id;
      }else if(sessionStorage.lobbyNumber !== undefined){
        gameId = sessionStorage.lobbyNumber
      }
      let getCurrentCard = new Promise((resolve, reject) => {
        const collection = 'activegame/' + gameId + "/memberarray/" + userId
        fetch(resolve, reject, collection);
      })
      getCurrentCard.then((data) => {
        if(data.length > 0){
          this.setState({displayName: data[1]})
          let getCardInfos = new Promise((resolve, reject) => {
            const collection = 'cards/' + data[0]
            fetch(resolve, reject, collection);
          })
          getCardInfos.then((data) => {
            let cardObj = {
              description: data[0],
              name: data[1],
              pictureback: data[2],
              picturefront: data[3]
            }
            this.setState({cards: cardObj})
            simpleState.evoke("loader", false)
            base.listenTo('activegame/' + gameId + "/memberarray/" + userId, {
              context: this,
              asArray: false,
              then(data){
                if(data.card === undefined){
                  this
                  .dialog
                  .handleOpen()  
                }
              }
            })
          })
        }else{
          this
          .props
          .history
          .push("join")
        }
      })
    }
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
      {this.state.voting === false ? 
      <div>
        <h2>{this.state.displayName} your card is:</h2>
        <Flipcard data={this.state.cards}/>
        <FloatingActionButton style={Styles.fab}
          onTouchTap={this.initVote}>
          <Gavel />
        </FloatingActionButton>
      </div>
      : 
        <div>
          {this.state.voted === false ? 
          <div>
            <CheckboxList
              votesData={this.state.voteData}
              ref={(checkList) => {
                this.checkList = checkList}}
              checkListChanged={this.checkListChanged}
            />
            <RaisedButton
              primary={true}
              style={Styles.centeredOnlyHorizontal}
              label={"Vote!!"}
              disabled={this.state.buttonDisabled}
              onClick={
              this.sendVote}/>
            </div>
            :
            <div>
              <Votelist
                disabled={true}
                voteData={this.state.votes}
                />
              <RaisedButton
                primary={true}
                style={Styles.centeredOnlyHorizontal}
                label={"Change Vote"}
                onClick={
                this.changeVote}/>
              </div>
          }
          <FloatingActionButton 
            style={Styles.fab}
            onTouchTap={this.initList}>
            <Viewlist />
          </FloatingActionButton>
        </div>
        }
      <Warningwindow
        message={"Game finished"}
          secondAction={this.gameDone}
          secondActionShow={true}
          secondActionLabel={"Leave game"}
          ref={(dialog) => {
          this.dialog = dialog
        }}/>
      </div>
    )
  }
}
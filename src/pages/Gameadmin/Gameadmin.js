import React, {Component} from 'react';
import {fetch, post} from '../../helpers/dbcalls';
import SimpleState from 'react-simple-state';
import Cards from '../../components/Cards/Cards';
import {base} from '../../config/constants';
import Votelist from '../../components/Votelist/Votelist';
import Styles from './Gameadmin.css.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Gavel from 'material-ui/svg-icons/action/gavel';
import Viewlist from 'material-ui/svg-icons/action/view-list';
import Deleteandroutebutton from '../../components/Deleteandroutebutton/Deleteandroutebutton';
const simpleState = new SimpleState();

export default class Gameadmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      gameCode: null,
      voting: false,
      votes: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  initVote = () => {
    this.setState({voting: true})
    const data = this.state.list
    console.log(data)
    let votingData = []
    for(let i = 0; i < data.length; i++){
      votingData[data[i].userKey] = {
        displayName: data[i].displayName,
        votes: 0
      }
    }
    console.log(votingData);
    const gameId = sessionStorage.lobbyNumber;
    let postVotingData = new Promise((resolve, reject) => {
      const collection = 'activegame/' + gameId + "/voting/data"
      post(resolve, reject, votingData, collection);
    })
    postVotingData.then((data) => {
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
              voteData[key].votes = voteData[key].votes + 1;
            }
            const objectArr = Object.values(voteData)
            this.setState({votes: objectArr});
          })
        }
      })
    })
  }

  initList = () => {
    this.setState({voting: false})
  }

  componentDidMount(){
    if(simpleState.getState("gameId").id === "" && sessionStorage.lobbyNumber === undefined){
      this.props.history.push("main")
    }else{
      let gameId = "";
      if(simpleState.getState("gameId").id !== ""){
        gameId = simpleState.getState("gameId").id;
        sessionStorage.lobbyNumber = gameId
      }else if(sessionStorage.lobbyNumber !== undefined){
        gameId = sessionStorage.lobbyNumber
      }
      let getGameCode = new Promise((resolve, reject) => {
        const collection = 'activegame/' + gameId + "/code/"
        const arrayBoolean = false;
        fetch(resolve, reject, collection, {}, arrayBoolean);
      })
      getGameCode.then((data) => {
        this.setState({gameCode: data})
      })

      let getActiveCards = new Promise((resolve, reject) => {
        const collection = 'activegame/' + gameId + "/memberarray/"
        fetch(resolve, reject, collection);
      })
      getActiveCards.then((data) => {
        const activeData = data;
        let getCardInfos = new Promise((resolve, reject) => {
          const collection = 'cards/'
          fetch(resolve, reject, collection);
        })
        getCardInfos.then((data) => {
          
          for(var i = 0; i < activeData.length; i++){
            const cardId = activeData[i].card;
            const index = data.findIndex(i => i.key === cardId);
            activeData[i].userKey = activeData[i].key;
            activeData[i].key = data[index].key;
            activeData[i].pictureback = data[index].pictureback;
            activeData[i].picturefront = data[index].picturefront;
            activeData[i].description = data[index].description;
            activeData[i].name = data[index].name;
            activeData[i].cardHeader = activeData[i].displayName + ": "+data[index].name;
          }
          this.setState({list: activeData})
          console.log(activeData)
          simpleState.evoke("loader", false)
        })
      })
    }
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h3>Lobbynumber: {this.state.gameCode}</h3>
        {this.state.voting === false ? 
        <div>
          <h2>Cards in game:</h2>
          <Cards counter={false} data={this.state.list}/>
          <div style={Styles.centeredOnlyHorizontal}>
          <Deleteandroutebutton
              route={"/main"}
              labelText={"Game finished"}
              dbReference={'activegame/' + sessionStorage.lobbyNumber}
              primary={true}/>            
        </div>
        <FloatingActionButton style={Styles.fab}
          onTouchTap={this.initVote}>
          <Gavel />
        </FloatingActionButton>
        </div>
        : 
        <div>
          <Votelist
          disabled={true}
          voteData={this.state.votes}
          />
          <FloatingActionButton style={Styles.fab}
          onTouchTap={this.initList}>
          <Viewlist />
          </FloatingActionButton>
        </div>
        }
      </div>
    )
  }
}
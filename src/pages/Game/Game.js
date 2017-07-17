import React, {Component} from 'react'
import {fetch} from '../../helpers/dbcalls'
import {base} from '../../config/constants'
import Flipcard from '../../components/Flipcard/Flipcard'
import SimpleState from 'react-simple-state'
import Styles from './Game.css.js'
import Votelist from '../../components/Votelist/Votelist'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Gavel from 'material-ui/svg-icons/action/gavel';
import Viewlist from 'material-ui/svg-icons/action/view-list';
import Warningwindow from '../../components/Warningwindow/Warningwindow'
const simpleState = new SimpleState()


export default class Gameadmin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      displayName: null,
      voting: false,
      votes: []
    }
  }

  initVote = () => {
    this.setState({voting: true})
  }
  initList = () => {
    this.setState({voting: false})
  }

  gameDone = () => {
    this
      .props
      .history
      .push("main")
  }

  sendVote = () => {
    this.voteList.sendVote()
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
                console.log(data)
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
      <h2>{this.state.displayName} your card is:</h2>
      {this.state.voting === false ? 
      <div>
      <Flipcard data={this.state.cards}/>
      <FloatingActionButton style={Styles.fab}
          onTouchTap={this.initVote}>
          <Gavel />
        </FloatingActionButton>
        </div>
      : 
        <div>
          <Votelist
          disabled={false}
          voteData={this.state.votes}
          ref={(voteList) => {
              this.voteList = voteList}}
          />
          <RaisedButton
          primary={true}
          label={"Vote!!"}
          onClick={
            this.sendVote}/>
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
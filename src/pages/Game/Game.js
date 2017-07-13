import React, {Component} from 'react'
import {fetch} from '../../helpers/dbcalls'
import {base} from '../../config/constants'
import Flipcard from '../../components/Flipcard/Flipcard'
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()

export default class Gameadmin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      displayName: null
    }
  }

  componentDidMount(){
    const userId = base
      .app()
      .INTERNAL
      .getUid()

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
        })
      })

    }
    
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
      <h2>{this.state.displayName} your card is:</h2>
        <Flipcard data={this.state.cards}/>
      </div>
    )
  }
}
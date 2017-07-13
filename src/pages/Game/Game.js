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
      cards: []
    }
  }

  componentDidMount(){
    const userId = base
      .app()
      .INTERNAL
      .getUid()
      
    console.log(userId)

    if(simpleState.getState("gameId").id === "" && sessionStorage.lobbyNumber === undefined){
      this.props.history.push("join")
    }else{
      let gameId = "";
      if(simpleState.getState("gameId").id !== ""){
        gameId = simpleState.getState("gameId").id;
      }else if(sessionStorage.lobbyNumber !== undefined){
        console.log("in session")
        gameId = sessionStorage.lobbyNumber
      }
      let getCurrentCard = new Promise((resolve, reject) => {
        console.log(gameId)
        const collection = 'activegame/' + gameId + "/memberarray/" + userId
        console.log(collection)
        fetch(resolve, reject, collection);
      })
      getCurrentCard.then((data) => {
        console.log("to route")
        console.log(data)
        let getCardInfos = new Promise((resolve, reject) => {
          console.log(simpleState.getState("gameId").id)
          const collection = 'cards/' + data[0]
          fetch(resolve, reject, collection);
        })
        getCardInfos.then((data) => {
          console.log("got card")
          console.log(data)
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
    console.log(this.state.cards)
    return (
      <div className="col-sm-6 col-sm-offset-3">
      <h2>Your Card:</h2>
        <Flipcard data={this.state.cards}/>
      </div>
    )
  }
}
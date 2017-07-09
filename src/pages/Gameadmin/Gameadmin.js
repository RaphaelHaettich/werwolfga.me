import React, {Component} from 'react'
import Cookies from 'universal-cookie';
import {fetch} from '../../helpers/dbcalls'
import SimpleState from 'react-simple-state'
import Cards from '../../components/Cards/Cards'
const simpleState = new SimpleState()
const cookies = new Cookies();

export default class Gameadmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    simpleState.evoke("loader", false)
    if(simpleState.getState("gameId").id === "" && cookies.get('lobbyNumber') === undefined){
      this.props.history.push("main")
    }else{
      let gameId = "";
      if(simpleState.getState("gameId").id !== ""){
        gameId = simpleState.getState("gameId").id;
      }else if(cookies.get('lobbyNumber') !== undefined){
        console.log("in cookies")
        console.log(cookies.get('lobbyNumber'))
        gameId = cookies.get('lobbyNumber')
      }
      let getActiveCards = new Promise((resolve, reject) => {
        console.log(gameId)
        const collection = 'activegame/' + gameId + "/memberarray/"
        console.log(collection)
        fetch(resolve, reject, collection);
      })
      getActiveCards.then((data) => {
        console.log("derp")
        console.log(data)
        const activeData = data;


        let getCardInfos = new Promise((resolve, reject) => {
          console.log(simpleState.getState("gameId").id)
          const collection = 'cards/'
          fetch(resolve, reject, collection);
        })
        getCardInfos.then((data) => {
          console.log("got card")
          console.log(data)
          console.log(activeData.length)
          for(var i = 0; i < activeData.length; i++){
            const cardId = activeData[i].card
            const index = data.findIndex(i => i.key === cardId);
            const owner = activeData[i].key
            activeData[i] = data[index]
            activeData[i].owner = owner;
          }
          this.setState({list: activeData})
        })
      })
    }
  }
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h2>Cards in game:</h2>
        <Cards counter={false} data={this.state.list}/>
      </div>
    )
  }
}
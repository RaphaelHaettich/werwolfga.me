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
    if(simpleState.getState("gameId").id === "" && cookies.get('lobbyNumber') === undefined){
      this.props.history.push("main")
    }else{
      let gameId = "";
      if(simpleState.getState("gameId").id !== ""){
        gameId = simpleState.getState("gameId").id;
      }else if(cookies.get('lobbyNumber') !== undefined){
        gameId = cookies.get('lobbyNumber')
      }
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
            const cardId = activeData[i].card
            const index = data.findIndex(i => i.key === cardId);
            const ownerKey = activeData[i].key
            const ownerDisplayName = activeData[i].displayName
            activeData[i] = data[index]
            activeData[i].userKey = ownerKey;
            activeData[i].displayName = ownerDisplayName;
          }
          this.setState({list: activeData})
          simpleState.evoke("loader", false)
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
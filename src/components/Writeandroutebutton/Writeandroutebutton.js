/*
*   Required Props:
*   dbReference: string,
*   labelText: string,
*   route: string
*
*   Optional Props:
*   removeState: string
*/

import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {base} from '../../config/constants'
import RaisedButton from 'material-ui/RaisedButton'
import SimpleState from 'react-simple-state'
import Warningwindow from '../Warningwindow/Warningwindow'
import shuffle from '../../helpers/shuffle'
import {post, update} from '../../helpers/dbcalls'
const simpleState = new SimpleState()

class writeAndRouteButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertMsg: ""
    };
  }

  startGame() {
    const usersObj = simpleState.getState('count')
    const cardsObj = simpleState.getState('cards')
    console.log(cardsObj)
    const cardsCount = cardsObj
      .list
      .map(function (a) {
        return a.count;
      })
      .reduce((a, b) => a + b, 0);
    const userCount = usersObj.count.length
    console.log(cardsCount)
    if ((cardsCount === userCount)&& userCount > 0) {
      console.log("start")
      let cards = []
      for (let i = 0; i < cardsObj.list.length; i++) { 
          console.log(cardsObj.list[i].count)
        for (let p = 0; p < cardsObj.list[i].count; p++) { 
          console.log(cardsObj.list[i].count)
          cards.push(cardsObj.list[i].key)
        }
      }
      shuffle(cards)
      let memberarray = [];
      for (let i = 0; i < usersObj.count.length; i++) {
        const key = usersObj.count[i].key 
        memberarray[key] =  {
            "card" : cards[i]
          }
      }
      let updateMembers = new Promise((resolve, reject) => {  
          const collection = this.props.dbReference + "/memberarray/"
          post(resolve, reject, memberarray, collection);
      })
      updateMembers.then((data) => {
        let setGameReady = new Promise((resolve, reject) => {  
            const collection = this.props.dbReference
            const object = {state: "ready"}
            update(resolve, reject, object, collection);
        })
        setGameReady.then((data) => {
          console.log("to route")
          this.props.history.push("gameadmin")
        }).catch( function (error) {
            alert("Error: " + error);
            this.setState({
              alertMsg: "Error: "+ error
            })
            this.dialog.handleOpen()
        });
      }).catch(function (error) {
        this.setState({
          alertMsg: "Error: "+ error
        })
        this.dialog.handleOpen()
      });
    } else {
      console.log("stop")
      this.setState({
        alertMsg: "You need as many players as selected cards. Please delete or add some cards or players. "
      })
      this.dialog.handleOpen()
    }
  }

  render() {
    return (
      <div>
        <Warningwindow message={this.state.alertMsg}
        ref={(dialog) => {this.dialog = dialog}}/>
        <RaisedButton
          primary={true}
          onClick={this
          .startGame
          .bind(this)}
          label={this.props.labelText}/>
      </div>
    )
  }
}

export default withRouter(writeAndRouteButton)
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
import {post} from '../../helpers/dbcalls'
const simpleState = new SimpleState()

class writeAndRouteButton extends Component {

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
      let promise = new Promise((resolve, reject) => {  
          const collection = this.props.dbReference + "/memberarray/"
          post(resolve, reject, memberarray, collection);
      })
      promise.then((data) => {
        //Do what ever
      }).catch(function (error) {
        alert("Error: " + error);
      });
    } else {
      console.log("stop")
      this.dialog.handleOpen()
    }
  }

  render() {
    return (
      <div>
        <Warningwindow message={"You need as many players as selected cards. Please delete or add some cards or players. "}
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
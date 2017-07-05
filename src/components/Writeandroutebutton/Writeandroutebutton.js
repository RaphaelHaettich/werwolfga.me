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
    if (cardsCount === userCount) {
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
      console.log(cards)
    } else {
      console.log("stop")
      this.dialog.handleOpen()
    }
  }

  render() {
    return (
      <div>
        <Warningwindow message={"You need as many players as selected cards. Please delete or add some cards or players."}
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
import React, { Component, } from 'react';
import SimpleState from 'react-simple-state';
import RaisedButton from 'material-ui/RaisedButton';
import Styles from './style.css.js';

const simpleState = new SimpleState();

export default class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    simpleState.evoke('loader', false);
  }
  render() {
    return (
      <div>
        <h3 style={Styles.textCenter}>The Rules: </h3>
        <p style={Styles.textCenter}>
          Before the game, one person is assigned the role of Moderator. 
          The other players sit in a circle, and the Moderator picks the roles 
          he wants to have in this particular game. He gives the players one card 
          each, all the players look at their cards without showing anyone, 
          and put them face-down in front of them. The game takes place in 2 parts:
        </p> 
        <p style={Styles.textCenter}>
          - Night: all the players close their eyes. The Moderator calls the characters 
          that have abilities, one at a time each person called will open their eyes, 
          perform his/her role&apos;s special action, and close them again.
        </p>
        <p style={Styles.textCenter}>
          - Day : everybody opens their eyes. The Moderator gives the name(s) of the player(s) 
          which have been killed during the night. Those killed arene&apos;t allowed to speak to 
          the living for the rest of the game. Then, all the survivors 
          debate and vote to lynch a player they think is a werewolf.
        </p>
        <br />
        <RaisedButton
          style={Styles.button}
          href="https://en.wikipedia.org/wiki/The_Werewolves_of_Millers_Hollow"
          target="_blank"
          label="More infos"
          primary
        />
      </div>
    );
  }
}

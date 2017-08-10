/*
*   Required Props:
*   key: string,
*   item: object
*   counter: boolean   
*   actionCard: boolean
*
*   Required simpleState:
*   cards
* 
*/

import React, { Component, } from 'react';
import { SpeedDial, SpeedDialItem, } from 'react-mui-speeddial-raphael-fork';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Share from 'material-ui/svg-icons/social/share';
import Mail from 'material-ui/svg-icons/content/mail';
import Copy from 'material-ui/svg-icons/content/content-copy';
import Styles from './style.css.js';
import WhatsApp from '../SvgIcons/WhatsApp';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import Delete from 'material-ui/svg-icons/action/delete';



class ChildCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidUpdate() {

  }

  fabAction1 = () => {
    // this.props.action(this.props.item.userKey);
  };

  render() {
    return (
      <SpeedDial
        style={Styles.speedDial}
        fabContentOpen={
          <Share />
        }
        fabContentClose={
          <NavigationClose />
        }
      >
        <SpeedDialItem
          label="Whatsapp"
          fabContent={<WhatsApp />}
          onTouchTap={this.fabAction1}
          style={Styles.speedDialItem}
        />
        <SpeedDialItem
          label="Email"
          fabContent={<Mail />}
          onTouchTap={this.fabAction1}
          style={Styles.speedDialItem}
        />
        <SpeedDialItem
          label="Copy to clipboard"
          fabContent={<Copy />}
          onTouchTap={this.fabAction1}
          style={Styles.speedDialItem}
        />
      </SpeedDial>
    );
  }
}

export default ChildCard;

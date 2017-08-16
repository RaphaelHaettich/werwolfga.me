/*
*   Required Props:
*   lobbyKey: string,
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
import clipboard from '../../helpers/clipboard';
import Snackbar from 'material-ui/Snackbar';

class ChildCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      open: false,
      snackMessage: '',
    };
  }

  componentDidUpdate() {

  }

  fabActionMail = () => {
    // eslint-disable-next-line max-len
    const body = `Join%20the%20game%20with%20this%20Link:%20${location.origin}/invitelink?id=${this.props.lobbyKey}.`;
    window.location.href = `mailto:?subject=Werwolf%20Game%20Invite&body=${body}`;
  };
  fabActionWhatsApp = () => {
    // eslint-disable-next-line max-len
    const body = `You%20are%20invited%20to%20join%20the%20Werwolfgame%20with%20this%20Link:%20${location.origin}/invitelink?id=${this.props.lobbyKey}.`;
    window.location.href = `whatsapp://send?text=${body}`;
  };
  fabActionCopy = () => {
    // eslint-disable-next-line max-len
    const copyToClipboard = clipboard(`${location.origin}/invitelink?id=${this.props.lobbyKey}`);
    if (copyToClipboard) {
      this.setState({ open: true, snackMessage: 'Successful copied link to clipboard', });
    } else {
      this.setState({ open: true, snackMessage: 'Copy link to clipboard failed', });
    }
  };

  render() {
    return (
      <div>
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
            fabContent={<WhatsApp Style={{ fill: 'green', }} />}
            onTouchTap={this.fabActionWhatsApp}
            style={Styles.speedDialItem}
          />
          <SpeedDialItem
            label="Email"
            fabContent={<Mail style={{ fill: 'white', }} />}
            onTouchTap={this.fabActionMail}
            style={Styles.speedDialItem}
          />
          <SpeedDialItem
            label="Copy to clipboard"
            fabContent={<Copy style={{ fill: 'white', }} />}
            onTouchTap={this.fabActionCopy}
            style={Styles.speedDialItem}
          />
        </SpeedDial>
        <Snackbar
          open={this.state.open}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          bodyStyle={{ backgroundColor: 'rgb(48, 48, 48)', }}
          contentStyle={{ color: 'white', }}
        />
      </div>
    );
  }
}

export default ChildCard;

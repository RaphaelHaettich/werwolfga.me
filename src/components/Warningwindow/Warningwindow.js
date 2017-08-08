/*
*   Required Props:
*   message: string
*
*   Optional Props:
*   secondActionShow: boolean 
*   secondAction: function 
*   secondActionLabel: String 
*
*/

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DialogAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let showActions = this.props.secondActionShow || false;
    const actions = [
      showActions === true
        ? <div>
          <FlatButton
            onClick={this.props.secondAction}
            label={this.props.secondActionLabel || 'placeholder'}
          />
          <FlatButton
            label="Discard"
            primary={true}
            onTouchTap={this.handleClose}
          />
        </div>
        : <FlatButton
          label="Discard"
          primary={true}
          onTouchTap={this.handleClose}
        />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.message}
        </Dialog>
      </div>
    );
  }
}

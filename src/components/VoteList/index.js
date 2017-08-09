import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Styles from './style.css.js';
import { List, ListItem } from 'material-ui/List';

class Votelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: []
    };
  }

  render() {
    var listItems = this.props.voteData.map((item, id) => {
      return (
        <ListItem
          key={id}
          primaryText={item.displayName}
          secondaryText={item.votedFor}
          disabled={this.props.disabled}
          rightAvatar={
            <div style={Styles.listNumber}>
              {item.votes}
            </div>
          }
        />
      );
    });
    return (
      <Paper zDepth={2}>
        <List>
          {listItems}
        </List>
      </Paper>
    );
  }
}

export default Votelist;
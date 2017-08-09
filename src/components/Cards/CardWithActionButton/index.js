/*
*   Required Props:
*   key: string,
*   item: object
*   
*   Required simpleState:
*   cards
*/

import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Styles from './style.css.js';
import SimpleState from 'react-simple-state';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card';

const simpleState = new SimpleState();

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    simpleState.evoke('loader', false);
  }

  fabAction = () => {
    this.props.action(this.props.item.userKey);
  };

  render() {
    const item = this.props.item;

    return (
      <div style={Styles.card}>
        <Divider />
        <Card>
          <FloatingActionButton
            mini
            style={Styles.fab}
            onTouchTap={this.fabAction}
          >
            <Delete />
          </FloatingActionButton>
          <CardMedia overlay={<CardTitle title={item.cardHeader} />}>
            <img
              style={Styles.cardImage}
              src={item.picturefront}
              alt="cardimage"
            />
          </CardMedia>
          <CardTitle
            subtitle="Expand for Description"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            {item.description}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default card;
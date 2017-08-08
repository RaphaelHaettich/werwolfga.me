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
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card';

const simpleState = new SimpleState();

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleImageLoaded = () => {
    simpleState.evoke('loader', false);
  }

  render() {
    let item = this.props.item;

    return (
      <div style={Styles.card}>
        <Divider />
        <Card>
          <CardMedia overlay={<CardTitle title={item.cardHeader} />}>
            <img
              style={Styles.cardImage}
              src={item.picturefront}
              alt="cardimage"
              onLoad={this.handleImageLoaded}
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

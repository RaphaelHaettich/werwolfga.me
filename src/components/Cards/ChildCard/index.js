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
import Divider from 'material-ui/Divider';
import InputCounter from '../../InputCounter';
import Styles from './style.css.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import SimpleState from 'react-simple-state';
import {
  Card,
  CardActions,
  CardText,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';

const simpleState = new SimpleState();

class ChildCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidUpdate() {
    // create array with counter of all cards
    if (this.props.counter) {
      const cardState = simpleState.getState('cards');
      const index = cardState.list
        .map(a => a.key)
        .indexOf(this.props.item.key);
      if (index !== -1) {
        cardState.list[index] = {
          key: this.props.item.key,
          count: this.state.count,
        };
      } else {
        cardState.list.push({
          key: this.props.item.key,
          count: this.state.count,
        });
      }
      simpleState.evoke('cards', {
        list: cardState.list,
      });
    }
  }

  handleImageLoaded = () => {
    simpleState.evoke('loader', false);
  }

  up = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  down = () => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  }

  fabAction = () => {
    // execute action defined in parent with userkey
    this.props.action(this.props.item.userKey);
  };

  render() {
    const item = this.props.item;
    return (
      <div style={Styles.card}>
        <Divider />
        <Card>
          {// when action active, show it
            this.props.actionCard
              ?
              <FloatingActionButton
                mini
                style={Styles.fab}
                onTouchTap={this.fabAction}
              >
                <Delete />
              </FloatingActionButton>
              :
              <div />
          }
          <CardMedia overlay={<CardTitle title={item.cardHeader || item.name} />}>
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
          
          {// when counter active, show it
            this.props.counter 
              ? 
              <CardActions>
                <InputCounter
                  count={this.state.count}
                  up={this.up}
                  down={this.down}
                />
              </CardActions>
              :
              <div />
          }
        </Card>
      </div>
    );
  }
}

export default ChildCard;

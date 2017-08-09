/*
*   Required Props:
*   item: object
*/

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Styles from './style.css.js';
import ReactCardFlip from 'react-card-flip';
import SimpleState from 'react-simple-state';
import { Card, CardText, CardTitle } from 'material-ui/Card';
const simpleState = new SimpleState();

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    simpleState.evoke('loader', false);
  }
  
  handleClick(e) {
    e.preventDefault();
    this.setState({
      isFlipped: !this.state.isFlipped
    });
  }

  render() {
    const item = this.props.data;
    return (
      <div>
        {this.state.isFlipped === false
          ? <Paper style={Styles.paper} zDepth={2}>
            <Card>
              <CardTitle
                title={item.name}
                subtitle="Expand for Description"
                actAsExpander
                showExpandableButton
              />
              <CardText expandable>
                {item.description}
              </CardText>
            </Card>
          </Paper>
          : <Paper style={Styles.paper} zDepth={2}>
            <Card>
              <CardTitle
                title="Hidden"
                subtitle="Expand for Description"
                actAsExpander
                showExpandableButton
              />
              <CardText expandable>Hidden</CardText>
            </Card>
          </Paper>}
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <img
            role="button"
            tabIndex={0}
            style={Styles.cardImage}
            onClick={this.handleClick}
            key="front"
            src={item.picturefront}
            alt=""
          />
          <img
            role="button"
            tabIndex={0}
            style={Styles.cardImage}
            onClick={this.handleClick}
            key="back"
            src={item.pictureback}
            alt=""
          />
        </ReactCardFlip>
      </div>
    );
  }
}

export default card;
/*
*   Required Props:
*   item: object
*/

import React, { Component, } from 'react';
import Paper from 'material-ui/Paper';
import Styles from './style.css.js';
import ReactCardFlip from 'react-card-flip';
import SimpleState from 'react-simple-state';
import { Card, CardText, CardTitle, } from 'material-ui/Card';
const simpleState = new SimpleState();

class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: true,
    };
  }

  componentDidMount() {
    simpleState.evoke('loader', false);
  }

  handleImageLoaded = () => {
    simpleState.evoke('loader', false);
  }
  
  handleClick = (event) => {
    event.preventDefault();
    // revert flipped state
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  render() {
    const item = this.props.data;
    return (
      <div>
        {// when card is not flipped show one side
          this.state.isFlipped === false
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
            :
            // when card is flipped show the other side 
            <Paper style={Styles.paper} zDepth={2}>
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
            onLoad={this.handleImageLoaded}
            role="button"
            tabIndex={0}
            style={Styles.cardImage}
            onClick={this.handleClick}
            key="front"
            src={item.picturefront}
            alt=""
          />
          <img
            onLoad={this.handleImageLoaded}
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

export default FlipCard;

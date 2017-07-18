/*
*   Required Props:
*   key: string,
*   item: object
*   
*   Required simpleState:
*   cards
*/

import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import Styles from './Cardwithactionbutton.css.js';
import SimpleState from 'react-simple-state';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {
  Card,
  CardText,
  CardMedia,
  CardTitle
} from 'material-ui/Card';

const simpleState = new SimpleState()

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  fabAction = () => {
    console.log("FAB action")
    this.props.action(this.props.item.userKey)
  }

  componentDidMount() {
    simpleState.evoke("loader", false)
  }

  render() {
    let item = this.props.item
    console.log(this.props.action)

    return (
      <div style={Styles.card}>
        <Divider/>
        <Card>
          <FloatingActionButton 
          mini={true}
          style={Styles.fab}
          onTouchTap={this.fabAction}>
            <Delete />
          </FloatingActionButton>
          <CardMedia overlay={< CardTitle title={
            item.cardHeader
          } />}>
            <img style={Styles.cardImage} src={item.picturefront} alt="cardimage"/>
          </CardMedia>
          <CardTitle
            subtitle="Expand for Description"
            actAsExpander={true}
            showExpandableButton={true}/>
          <CardText expandable={true}>
            {item.description}
          </CardText>
        </Card>
      </div>
    )
  }
}

export default card
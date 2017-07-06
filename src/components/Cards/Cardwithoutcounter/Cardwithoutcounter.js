/*
*   Required Props:
*   key: string,
*   item: object
*   
*   Required simpleState:
*   cards
*/

import React, {Component} from 'react'
import Divider from 'material-ui/Divider'
import Styles from './Cardwithoutcounter.css.js'
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()

import {
  Card,
  CardText,
  CardMedia,
  CardTitle
} from 'material-ui/Card';

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    simpleState.evoke("loader", false)
  }

  render() {
    let item = this.props.item

    return (
      <div style={Styles.card}>
        <Divider/>
        <Card>
          <CardMedia overlay={< CardTitle title={
            item.name
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
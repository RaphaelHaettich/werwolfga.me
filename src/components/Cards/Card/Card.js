/*
*   Required Props:
*   key: string,
*   item: object
*/

import React, {Component} from 'react'
import Inputcounter from './Inputcounter/Inputcounter'
import Divider from 'material-ui/Divider'
import Styles from './Card.css.js'

import {
  Card,
  CardActions,
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


  up(e) {
    this.setState({
      count: this.state.count + 1
    });
  }
  down(e) {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      });
    }
  }

  render() {
    let item = this.props.item
    console.log(this.state.count)
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
          <CardActions>
            <Inputcounter count={this.state.count} up={this.up.bind(this)} down={this.down.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default card
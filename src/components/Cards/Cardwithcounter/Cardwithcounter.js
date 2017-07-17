/*
*   Required Props:
*   key: string,
*   item: object
*   
*   Required simpleState:
*   cards
*/

import React, {Component} from 'react'
import Inputcounter from '../../Inputcounter/Inputcounter'
import Divider from 'material-ui/Divider'
import Styles from './Cardwithcounter.css.js'
import SimpleState from 'react-simple-state'
import {
  Card,
  CardActions,
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
  componentDidMount() {
    simpleState.evoke("loader", false)
  }
  componentDidUpdate() {
    let cardState = simpleState.getState("cards")
    const index = cardState.list.map(function(e) { return e.key; }).indexOf(this.props.item.key);
    if(index !== -1){
      cardState.list[index]= {key: this.props.item.key,count: this.state.count}
    }else{
      cardState.list.push({key: this.props.item.key,count: this.state.count})
    }
    simpleState.evoke("cards", {
      list: cardState.list
    });
  }

  render() {
    let item = this.props.item

    return (
      <div style={Styles.card}>
        <Divider/>
        <Card>
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
          <CardActions>
            <Inputcounter count={this.state.count} up={this.up.bind(this)} down={this.down.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default card
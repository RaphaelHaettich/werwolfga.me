/*
*   Required Props:
*   item: object
*/

import React, {Component} from 'react'
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()



class card extends Component {

  componentDidMount() {
    simpleState.evoke("loader", false)
    console.log(simpleState.getState("loader"))
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
          <CardActions>
            <Inputcounter count={this.state.count} up={this.up.bind(this)} down={this.down.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default card
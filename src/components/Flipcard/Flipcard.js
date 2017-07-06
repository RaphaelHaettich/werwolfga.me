/*
*   Required Props:
*   item: object
*/

import React, {Component} from 'react'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()



class card extends Component {

  componentDidMount() {
    simpleState.evoke("loader", false)
    console.log(simpleState.getState("loader"))
  }


  render() {
    let item = this.props.data

    return (
      <div >
        <Card>
            <CardMedia>
            <img src={item.picturefront} alt="" />
            </CardMedia>
            <CardTitle title="Card title"/>
            <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
        </Card>
      </div>
    )
  }
}

export default card
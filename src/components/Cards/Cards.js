/*
*   Required Props:
*   data: objectarray
*   counter: boolean
*/

import React, { Component } from 'react'
import Cardwithcounter from './Cardwithcounter/Cardwithcounter'
import Cardwithoutcounter from './Cardwithoutcounter/Cardwithoutcounter'
import Cardwithactionbutton from './Cardwithactionbutton/Cardwithactionbutton'

class cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  
  render() {
    var listItems = this
      .props
      .data
      .map((item, index) => {
        return (
          this.props.cardStyle === "counter"
          ? <Cardwithcounter key={index} item={item}/>
          : this.props.cardStyle === "action" 
          ? <Cardwithactionbutton key={index} action={this.props.action} item={item}/>
          : <Cardwithoutcounter key={index} item={item}/>
        )
      });

    return (
      <div>
        {listItems}
      </div>
    )
  }
}

export default cards
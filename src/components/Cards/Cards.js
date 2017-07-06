/*
*   Required Props:
*   data: objectarray
*   counter: boolean
*/

import React, { Component } from 'react'
import Cardwithcounter from './Cardwithcounter/Cardwithcounter'
import Cardwithoutcounter from './Cardwithoutcounter/Cardwithoutcounter'

class cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  
  render() {
    console.log(this.props.data)
    var listItems = this
      .props
      .data
      .map((item, index) => {
        return (
          this.props.counter === true
          ? <Cardwithcounter key={index} item={item}/>
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
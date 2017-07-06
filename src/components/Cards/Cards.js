/*
*   Required Props:
*   data: objectarray
*/

import React, { Component } from 'react'
import { base } from '../../config/constants'
import Card from './Card/Card'

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
          <Card key={index} item={item}/>
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
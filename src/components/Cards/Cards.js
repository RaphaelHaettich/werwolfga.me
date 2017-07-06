/*
*   Required Props:
*   dbReference: string
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
  
  componentDidMount() {
    this.ref = base.syncState(this.props.dbReference, {
      context: this,
      state: 'list',
      asArray: true,
    });
  }
  
  render() {
    var listItems = this
      .state
      .list
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
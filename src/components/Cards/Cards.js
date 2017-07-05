/*
*   Required Props:
*   dbReference: string
*/

import React, { Component } from 'react'
import { base } from '../../config/constants'
import Card from './Card/Card'
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()

class cards extends Component {
  constructor(props) {
    super(props);

    simpleState.addListener('cards', {
        list: []
    });

    this.state = {
      list: []
    }
  }
  
  componentDidMount() {
    this.ref = base.syncState(this.props.dbReference, {
      context: this,
      state: 'list',
      asArray: true,
      then() {
        this.setState({ loading: false})
      }
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
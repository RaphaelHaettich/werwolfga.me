import React, {Component} from 'react'
import Cards from './Cards'
import Joinedcount from './Joinedcount'

class create extends Component {
  render() {
    return (
      <div>
        <h3>
          Available Cards
        </h3>
        <Cards /> 
        <Joinedcount />
      </div>
    )
  }
}

export default create

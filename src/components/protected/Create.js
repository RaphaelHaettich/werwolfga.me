import React, {Component} from 'react'
import {base} from '../../config/constants'
import Cards from './Cards'
import Joinedcount from './Joinedcount'

console.log(base)

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

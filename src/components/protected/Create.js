import React, {Component} from 'react'
import {base} from '../../config/constants'
import Cards from './Cards'
import Joinedcount from './Joinedcount'

console.log(base)

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    }
  }
  componentDidMount() {
    this.ref = base.syncState('cards', {
      context: this,
      state: 'list',
      asArray: true,
      then() {
        this.setState({loading: false})
      }
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  handleAddItem(newItem) {
    this.setState({
      list: this
        .state
        .list
        .concat([newItem])
    });
  }
  render() {
    return (
      <div>
        <h3>
          Available Cards
        </h3>
        {this.state.loading === true
          ? <h3>
              LOADING...
            </h3>
          : <Cards items={this.state.list}/>}
        <Joinedcount />
      </div>
    )
  }
}

export default create
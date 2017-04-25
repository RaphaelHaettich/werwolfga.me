import React, { Component } from 'react'
import { base } from '../../config/constants'
import Cards from './Cards'

console.log(base)

class create extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true
    }
  }
  componentDidMount(){
    this.ref = base.syncState('cards', {
      context: this,
      state: 'list',
      asArray: true,
      then(){
        this.setState({loading: false})
      }
    });
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  handleAddItem(newItem){
    this.setState({
      list: this.state.list.concat([newItem])
    });
  }
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-offset-3">
            <div className="col-sm-12">
              <h3 className="text-center"> Available Cards </h3>
              {this.state.loading === true ? <h3> LOADING... </h3> : <Cards items={this.state.list}/>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default create
import React, {Component} from 'react'
import Button from 'muicss/lib/react/button'
import {base} from '../../config/constants'

export default class countbutton extends Component {
  componentDidMount() {
    base.bindToState('todoList', {
      context: this,
      state: 'count',
      asArray: true
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  render() {
    var counter = this.state.count;
    if (counter !== undefined) {
      var counter = counter.length
    }
    console.log(counter)
    return (
      <div>
        <h3>
          Joined People:
          <label>{counter}</label>
        </h3>
        <Button color="primary">Start</Button>
      </div>
    )
  }
}


// database.ref("activegame/"+ snapshot.key +"/memberarray/").on('child_added', function(snapshot) {
//             console.log("new item added")
//             var currentplayercount = Number(document.getElementById("pcount").innerHTML)
//             document.getElementById("pcount").innerHTML = currentplayercount + 1
//         });

//         componentDidMount(){
//           this.ref = base.syncState('activegame', {
//             context: this,
//             state: 'list',
//             asArray: true,
//             then(){
//               this.setState({loading: false})
//             }
//           });
//         }
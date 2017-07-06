/*
*   Required Props:
*   item: object
*/

import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import Styles from './Flipcard.css.js'
import ReactCardFlip from 'react-card-flip';
import SimpleState from 'react-simple-state'
const simpleState = new SimpleState()

class card extends Component {

    componentDidMount() {
        simpleState.evoke("loader", false)
        console.log(simpleState.getState("loader"))
    }
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
        this.handleClick = this
            .handleClick
            .bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.setState({
            isFlipped: !this.state.isFlipped
        });
    }

    render() {
        let item = this.props.data

        return (
            <div >
                {this.state.isFlipped === false ?
                <Paper zDepth={2}>
                    <h1>{item.name}</h1>
                    <h3>{item.description}</h3> 
                </Paper>
                :
                <Paper zDepth={2}>
                    <h1>Hidden</h1>
                    <h3>Hidden</h3> 
                </Paper>
                    }
                <ReactCardFlip isFlipped={this.state.isFlipped}>
                    <img style={Styles.cardImage} onClick={this.handleClick} key="front" src={item.picturefront} alt=""/>

                    <img style={Styles.cardImage} onClick={this.handleClick} key="back" src={item.pictureback} alt=""/>
                </ReactCardFlip>
            </div>
        )
    }
}

export default card
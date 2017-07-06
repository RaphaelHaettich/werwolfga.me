/*
*   Required Props:
*   item: object
*/

import React, {Component} from 'react'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
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
                <Paper zDepth={2}>
                    <h1>{item.name}</h1>
                    <h3>{item.description}</h3>
                </Paper>
                <ReactCardFlip isFlipped={this.state.isFlipped}>
                    <img onClick={this.handleClick} key="front" src={item.picturefront} alt=""/>

                    <img onClick={this.handleClick} key="back" src={item.pictureback} alt=""/>
                </ReactCardFlip>
            </div>
        )
    }
}

export default card
import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import Styles from './Votelist.css.js'
import {List, ListItem} from 'material-ui/List';

class Votelist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataArray: []
        };
    }
    

    componentWillReceiveProps(data){
        console.log(data)
        this.setState({dataArray: this.props.voteData})
    }


    render() {
        console.log(this.state.dataArray)
        var listItems = 
            this.props.voteData
            .map((item, index) => {
                console.log(item)
            return (
                <ListItem key={index} primaryText={item.displayName} disabled={this.props.disabled} rightAvatar={<div style={Styles.listNumber}>{item.votes}</div>}/>
            )
        });
        console.log(listItems)
        return (
            <Paper zDepth={2}>
                <List>
                    {listItems}
                </List>
            </Paper>
        )
    }
}

export default Votelist
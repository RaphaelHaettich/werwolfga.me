import React, {Component} from 'react'
import CountButton from './Countbutton'
import Divider from 'material-ui/Divider'

import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class card extends Component {
  render() {
    var styles = {
      cardImage: {
        maxHeight: "200px", 
        display: "block", 
        marginLeft: "auto", 
        marginRight: "auto", 
        width: "auto",
        minWidth: "0%"  
      },
      card: {
        marginBottom: "15px"
      }
    };
    let item = this.props.item
    return (
      <div style={styles.card}>
        <Divider />
        <Card>
          <CardMedia
            overlay={< CardTitle title = {item.name} />}>
            <img style={styles.cardImage} src={item.picturefront} />
          </CardMedia>
          <CardTitle subtitle="Expand for Description" actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>
            {item.description}
          </CardText>
          <CardActions>
            <CountButton />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default card
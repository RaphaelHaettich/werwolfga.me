import React, { Component } from 'react'
import Panel from 'muicss/lib/react/panel';
import Divider from 'muicss/lib/react/divider';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';

class cards extends Component {
  render(){
    var styles = {
      listGroup: {
        margin: '5px 0'
      },
      card: {
        paddingRight: 20,
        fontSize: 17,
      },
      cardTitle: {
        fontSize: 20,
        textDecoration: "underline"
      },
      panel: {
        marginBottom: 0
      },
      image: {
        maxHeight: "50px"
      },
      counter: {
        marginRight: "5px",
        marginLeft: "5px",
      }
      ,
      button: {
        fontSize: 25
      }
    };
    var listItems = this.props.items.map((item, index) => {
      return (
        <Container key={index} className="list-group-item" style={styles.listGroup}>
            <Panel style={styles.panel}>
                <Row>
                    <Col xs="2" md="4">
                         <img alt="cardimage" style={styles.image} src={item.picturefront}/>
                    </Col>
                    <Col xs="10" md="8">
                        <span style={styles.card}>
                            <label style={styles.cardTitle}>{item.name}</label>
                            <br />
                            {item.description}
                            <br />
                            <Button style={styles.button} color="primary">+</Button>
                            <label style={styles.counter}>0</label>
                            <Button style={styles.button} color="primary">-</Button>
                        </span>
                    </Col>
                </Row>   
            </Panel>
            <Divider />
        </Container>
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
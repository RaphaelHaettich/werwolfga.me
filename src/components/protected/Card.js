import React, { Component } from 'react'
import Panel from 'muicss/lib/react/panel'
import Divider from 'muicss/lib/react/divider'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import CountButton from './Countbutton'

class card extends Component {
  render() {
    var styles = {
      listGroup: {
        margin: '5px 0'
      },
      card: {
        paddingRight: 20,
        fontSize: 17
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
      }
    };
    let item = this.props.item
    return (
      <Container style={styles.listGroup}>
        <Panel style={styles.panel}>
          <Row>
            <Col xs="2" md="4">
              <img alt="cardimage" style={styles.image} src={item.picturefront} />
            </Col>
            <Col xs="10" md="8">
              <span style={styles.card}>
                <label style={styles.cardTitle}>{item.name}</label>
                <br /> {item.description}
                <br />
                <CountButton />
              </span>
            </Col>
          </Row>
        </Panel>
        <Divider />
      </Container>
    )
  }
}

export default card
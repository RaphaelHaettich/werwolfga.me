import React, { Component } from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system';

export default class join extends Component {
  render () {
    return (
      <Card>
        <CardTitle title="Join Game" />
        <CardActions>
        <Container>
        <Row>
        <Col xs={6}>
          <TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"
          />
          </Col>
          <Col xs={6}>
          <FlatButton label="Action2" />
          </Col>
          </Row>
          </Container>
        </CardActions>
        <CardText >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    )
  }
}
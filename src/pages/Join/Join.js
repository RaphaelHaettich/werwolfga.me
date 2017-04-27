import React, {Component} from 'react'
import {Card, CardActions, CardTitle} from 'material-ui/Card'
import {update} from '../../helpers/dbcalls'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { base } from '../../config/constants'
import {
  Container,
  Row,
  Col
} from 'react-grid-system';

export default class join extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const number = this.number.input.value 
    let getUUID = new Promise((resolve, reject) => {
      base.fetch('activegame/', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'code',
          equalTo: Number(number)
        }
      }).then(data => {
        resolve(data);
      }).catch(error => {
        //handle error
      })
    })
    getUUID.then((data) => {
      if(data[0].state === "draft"){
        const userId = base
        .app()
        .INTERNAL
        .getUid()
        const collection = "activegame/"+ data[0].key + "/memberarray/"+ userId
        let object = {card: "null"} 
        let addUser = new Promise((resolve, reject) => {
          update(resolve, reject, object, collection);
        })
        addUser.then((data) => {
          //Do what ever
        }).catch(function (error) {
          alert("Error: " + error);
        });

      }
    })
  }
  render() {
    return (
      <Card>
        <CardTitle title="Join Game"/>
          <CardActions>
            <form onSubmit={this.handleSubmit}>
            <Container style={{marginLeft: "8px"}}>
              <Row>
                <Col xs={8}>
                  <TextField
                    ref={(number) => this.number = number}
                    maxLength="6"
                    type="tel"
                    hintText="123456"
                    floatingLabelText="Lobby Id"
                    fullWidth={true}/>
                </Col>
                <Col xs={4}>
                  <FlatButton 
                    type="submit"
                    label="Join"
                    style={{height: "100px"}}/>
                </Col>
              </Row>
            </Container>
          </form>
        </CardActions>
      </Card>
    )
  }
}
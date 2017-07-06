import React, {Component} from 'react'
import {Card, CardActions, CardTitle} from 'material-ui/Card'
import {update} from '../../helpers/dbcalls'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { base } from '../../config/constants'
import Warningwindow from '../../components/Warningwindow/Warningwindow'
import {
  Container,
  Row,
  Col
} from 'react-grid-system';

export default class join extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertMsg: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userId = base
      .app()
      .INTERNAL
      .getUid()

    let getUUID = new Promise((resolve, reject) => {
      const number = this.number.input.value 
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
        this.setState({
          alertMsg: "Error: "+ error
        })
        this.dialog.handleOpen()
        console.log(error)
      })
    })

    let addUser = (key) => {
      let promise = new Promise((resolve, reject) => {
        const collection = "activegame/"+ key + "/memberarray/"+ userId
        let object = {card: "null"}
        update(resolve, reject, object, collection);
      })
      promise.then((data) => {
        //Do what ever
      }).catch(function (error) {
        this.setState({
          alertMsg: "Error: "+ error
        })
        this.dialog.handleOpen()
        console.log(error)
      });
    }

    getUUID.then((data) => {
      if(data[0].state === "draft"){
        addUser(data[0].key)
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
        <Warningwindow message={this.state.alertMsg}
        ref={(dialog) => {this.dialog = dialog}}/>
      </Card>
    )
  }
}
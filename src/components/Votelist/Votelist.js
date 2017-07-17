import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import {base} from '../../config/constants'
import {fetch, post} from '../../helpers/dbcalls'
import Styles from './Votelist.css.js'
import {List, ListItem} from 'material-ui/List';

class Votelist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundStyle: {
        state: "first",
        gameId: null
      },
      selectedItem: {},
      disabled: this.props.disabled,
      votes: []
    };
  }

  vote = (e, item) => {
    const userId = base
      .app()
      .INTERNAL
      .getUid()
    e.persist()
    let currentTarget = e.currentTarget
    if (!this.state.disabled) {
      let getIfUserVoted = new Promise((resolve, reject) => {
        const collection = 'activegame/' + sessionStorage.lobbyNumber + '/voting/voter/' + userId
        fetch(resolve, reject, collection);
      })
      getIfUserVoted.then((data) => {
        console.log(data)
        if (data.length === 0) {
          switch (this.state.backgroundStyle.state) {
            case "red":
              console.log("case red");
              if (this.state.backgroundStyle.gameId === item.key) {
                this.setState({
                  backgroundStyle: {
                    state: "first"
                  }
                })
                this.setState({selectedItem: {}});
                currentTarget.childNodes[0].style.backgroundColor = "rgba(183, 28, 28,0)";
                console.log("in case red");
              };
              console.log(this.state.selectedItem);
              break;
            case "first":
              console.log("case first");
              this.setState({selectedItem: item});
              this.setState({
                backgroundStyle: {
                  state: "red",
                  gameId: item.key
                }
              });
              currentTarget.childNodes[0].style.backgroundColor = "rgba(183, 28, 28,0.3)";
              console.log(this.state.selectedItem);
              break;
            default:
              console.log("case default");
              console.log(this.state.selectedItem);
              break;
          }
        } else {
          this.setState({disabled: true})
        }
      })
    } else {
      e.preventDefault()
    }
  }

  sendVote = (e) => {
    console.log("send vote")
    console.log(this.state.selectedItem);
    if (this.state.selectedItem.key !== undefined) {
      const userId = base
      .app()
      .INTERNAL
      .getUid()
      console.log("in send")
      const voteItem = this.state.selectedItem;
      this.setState({disabled: true});
      this.setState({selectedItem: {}});
      const dataP1 = {displayName: voteItem.displayName};
      const dataP2 = {displayName: voteItem.displayName};
      const collectionP1 = 'activegame/' + sessionStorage.lobbyNumber + '/voting/voter/' + userId;
      const collectionP2 = 'activegame/' + sessionStorage.lobbyNumber + '/voting/votes/' + voteItem.key + "/voter/" + voteItem.key;
      console.log(collectionP1)
      console.log(dataP1)
      const p1 = new Promise((resolve, reject) => {
        post(resolve, reject, dataP1, collectionP1);
      }); 
      const p2 = new Promise((resolve, reject) => {
        post(resolve, reject, dataP2, collectionP2);
      }); 
      Promise.all([p1, p2]).then(([v1, v2]) => {
          console.log("posted")
      })

      //send votes to server
    }
  }

  componentWillMount() {
    base.listenTo('activegame/' + sessionStorage.lobbyNumber + "/voting/votes", {
      context: this,
      asArray: true,
      then(votesData){
        console.log(votesData)
        this.setState({votes: votesData})
      }
    })
  }

  render() {
    let listItems = this
      .state
      .votes
      .map((item, index) => {
        console.log(item.voter)
        let voteCount = 0;
        let displayNameString = ""
        if(item.voter !== undefined){
          console.log("asd")
          voteCount = Object.keys(item.voter).length;

          for(let i = 0; i < voteCount; i++){
            let displayName = item.voter[Object.keys(item.voter)[i]].displayName;
            console.log(displayName)
              if(displayName){
                console.log("asddd")
                if(displayNameString === ""){
                  displayNameString = displayNameString + displayName;
                }else{
                  displayNameString = displayNameString + " | " + displayName;
                }
              }
          }
          console.log(displayNameString)
        }
        console.log(voteCount)
        return (<ListItem
          key={index}
          primaryText={item.displayName}
          disabled={this.state.disabled}
          secondaryText={displayNameString}
          rightAvatar={
            <div style = {Styles.listNumber } > {
              voteCount
            } </div>
          }
          onTouchTap={((e) => this.vote(e, item))}/>)
      });
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
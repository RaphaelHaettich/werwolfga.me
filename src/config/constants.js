import Rebase from 're-base';

var connection = Rebase.createClass({
  apiKey: 'AIzaSyA4imvHroiFIbJsjhdmCgBXSLBa0LAQ3bs',
  authDomain: 'werewolvesgame-e65c4.firebaseapp.com',
  databaseURL: 'https://werewolvesgame-e65c4.firebaseio.com',
  storageBucket: 'werewolvesgame-e65c4.appspot.com',
});

export const base = connection;
export const ref = connection.database().ref();
export const firebaseAuth = connection.auth;

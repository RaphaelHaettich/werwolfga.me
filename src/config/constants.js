import Rebase from 're-base';


var connection = Rebase.createClass({
    apiKey: "AIzaSyDU4OL6YUTBjiPjP8WM8nLaQkisykix9OE",
    authDomain: "testproject-7dd30.firebaseapp.com",
    databaseURL: "https://testproject-7dd30.firebaseio.com"
});


export const base = connection
export const ref = connection.database().ref()
export const firebaseAuth = connection.auth
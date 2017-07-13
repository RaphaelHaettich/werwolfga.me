import Rebase from 're-base';


var connection = Rebase.createClass({
    apiKey: "AIzaSyDGuR3v6NOyBa5Om_3u5lYVCesKuaMMBQ8",
    authDomain: "werewolvegame.firebaseapp.com",
    databaseURL: "https://werewolvegame.firebaseio.com"
});


export const base = connection
export const ref = connection.database().ref()
export const firebaseAuth = connection.auth
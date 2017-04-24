import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDU4OL6YUTBjiPjP8WM8nLaQkisykix9OE",
  authDomain: "testproject-7dd30.firebaseapp.com",
  databaseURL: "https://testproject-7dd30.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, displayName) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((data) => {
      saveUser(data, displayName)
    })
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user, displayName) {
  console.log(user)
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      displayName: displayName
    })
    .then(() => user)
}

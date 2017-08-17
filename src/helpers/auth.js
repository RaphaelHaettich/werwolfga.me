import { ref, firebaseAuth, } from '../config/constants';

// Register new user
export const auth = function auth(email, password, displayName) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
      saveUser(data, displayName);
    });
};

// logout
export const logout = function logout() {
  return firebaseAuth().signOut();
};

// login
export const login = function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
};

// reset password
export const resetPassword = function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
};

// save user to own db after its saved to firebase users
export const saveUser = function saveUser(user, displayName) {
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      displayName,
    })
    .then(() => user);
};

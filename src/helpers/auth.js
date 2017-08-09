import { ref, firebaseAuth } from '../config/constants';

export const auth = function auth(email, pw, displayName) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then((data) => {
    saveUser(data, displayName);
  });
};

export const logout = function logout() {
  return firebaseAuth().signOut();
};

export const login = function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
};

export const resetPassword = function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
};

export const saveUser = function saveUser(user, displayName) {
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      displayName
    })
    .then(() => user);
};

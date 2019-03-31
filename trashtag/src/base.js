import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBJU3Ix_ZJpvApH79O4pbC41PwZwgF7NcE",
    authDomain: "trashtag-1553927435734.firebaseapp.com",
    databaseURL: "https://trashtag-1553927435734.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
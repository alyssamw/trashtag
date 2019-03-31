import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "trashtag-1553927435734.firebaseapp.com",
    databaseURL: "https://trashtag-1553927435734.firebaseio.com",
    projectId: "trashtag-1553927435734",
    storageBucket: "trashtag-1553927435734.appspot.com",
    messagingSenderId: "852962947752"

})

const storage = firebase.storage();

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { storage, firebaseApp };

// This is a default export
export default base;
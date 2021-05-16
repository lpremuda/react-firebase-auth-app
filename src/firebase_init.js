import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCxAALZMLdh9gUPHCxI7hxg-1SEWkAExi8",
    authDomain: "auth-development-my-try.firebaseapp.com",
    projectId: "auth-development-my-try",
    storageBucket: "auth-development-my-try.appspot.com",
    messagingSenderId: "1015188100527",
    appId: "1:1015188100527:web:6eb0a32e5dc1ebfd2dcb5a"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export default app
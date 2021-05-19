import firebase from 'firebase/app';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDudql1Jx3GGmi_iGMTe-wHr-zurNW5YNs",
    authDomain: "expense-calculator-462e4.firebaseapp.com",
    projectId: "expense-calculator-462e4",
    storageBucket: "expense-calculator-462e4.appspot.com",
    messagingSenderId: "10885561948",
    appId: "1:10885561948:web:c642148a66c88d910ab099"
};


//Initialize Firebase 

firebase.initializeApp(firebaseConfig);

export default firebase;

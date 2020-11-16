import firebase from 'firebase';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBF78U6iLTZfUm2vHVfU6cMSWECjqx5-Y0",
    authDomain: "coffeeshops-ddd2c.firebaseapp.com",
    databaseURL: "https://coffeeshops-ddd2c.firebaseio.com",
    projectId: "coffeeshops-ddd2c",
    storageBucket: "coffeeshops-ddd2c.appspot.com",
    messagingSenderId: "1028457274837",
    appId: "1:1028457274837:web:044176a01f13351111f15c",
  };

firebase.initializeApp(firebaseConfig) ;

const storage = firebase.storage();

export {
  storage, firebase as default
}

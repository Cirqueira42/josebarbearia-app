const firebaseConfig = {
  apiKey: "AIzaSyXXXX",
  authDomain: "jose-barbearia.firebaseapp.com",
  projectId: "jose-barbearia",
  storageBucket: "jose-barbearia.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

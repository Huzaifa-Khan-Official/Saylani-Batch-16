
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyD3xdBNh1_sTZxwPVUjXO7WWySt0UYe57g",
  authDomain: "saylani-b16.firebaseapp.com",
  projectId: "saylani-b16",
  storageBucket: "saylani-b16.firebasestorage.app",
  messagingSenderId: "463395456534",
  appId: "1:463395456534:web:9184e8fdd0accb2798d737",
  measurementId: "G-GDLN7HGMXW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);


const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

signupBtn.addEventListener("click", () => {
  const semail = document.getElementById("semail").value
  const spassword = document.getElementById("spassword").value


  createUserWithEmailAndPassword(auth, semail, spassword)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      console.log("user ==>", user);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorMSG ==>", errorMessage);

    });
})

loginBtn.addEventListener("click", () => {

  const lemail = document.getElementById("lemail").value
  const lpassword = document.getElementById("lpassword").value

  signInWithEmailAndPassword(auth, lemail, lpassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log("success ==>", user);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("error Message ==>", errorMessage);
      
    });
})
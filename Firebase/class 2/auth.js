import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { app } from "./config.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

signupBtn.addEventListener("click", showSignup)
loginBtn.addEventListener("click", showLogin)

function showLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginBtn').classList.add('bg-blue-600', 'text-white');
  document.getElementById('loginBtn').classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
  document.getElementById('signupBtn').classList.remove('bg-blue-600', 'text-white');
  document.getElementById('signupBtn').classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
}

function showSignup() {
  document.getElementById('signupForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupBtn').classList.add('bg-blue-600', 'text-white');
  document.getElementById('signupBtn').classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
  document.getElementById('loginBtn').classList.remove('bg-blue-600', 'text-white');
  document.getElementById('loginBtn').classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
}

const registerUser = async () => {
  const signupEmail = document.getElementById("signupEmail").value;
  const signupPassword = document.getElementById("signupPassword").value;
  const signupName = document.getElementById("signupName").value;
  const signupConfirmPassword = document.getElementById("signupConfirmPassword").value;

  if (signupPassword !== signupConfirmPassword) {
    alert("Password not matched!")
    return
  }
  console.log("signupEmail ==>", signupEmail);
  console.log("signupPassword ==>", signupPassword);
  console.log("signupName ==>", signupName);
  try {
    const user = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
    console.log("success ==>", user);

    await sendEmailVerification(auth.currentUser);
    alert("Please verify your email.");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("error ==>", errorMessage);
  }



  // createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
  //   .then((userCredential) => {
  //     // Signed up 
  //     const user = userCredential.user;

  //     console.log("success ==>", user);

  //     sendEmailVerification(auth.currentUser)
  //       .then(() => {
  //         alert("Please verify your email.")
  //       });
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;

  //     console.log("error ==>", errorMessage);
  //   });
}

const loginUser = async () => {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if (user.emailVerified) {
        localStorage.setItem("user_uid", user.uid);
        location = "./index.html"
      } else {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert("Please verify your email.")
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Invalid Credentials!")
    });
}

const signupWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      console.log("success ==>", user);
      localStorage.setItem("user_uid", user.uid);
      location = "./index.html"

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log("error ==>", errorMessage);
    });
}

const signFunc = document.getElementById("signFunc")
const loginUserBtn = document.getElementById("loginUserBtn")
const googleBtn = document.getElementById("googleBtn")
const googleLoginBtn = document.getElementById("googleLoginBtn")

signFunc.addEventListener("click", registerUser)
loginUserBtn.addEventListener("click", loginUser)
googleBtn.addEventListener("click", signupWithGoogle)
googleLoginBtn.addEventListener("click", signupWithGoogle)

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"

const user_uid = localStorage.getItem("user_uid");

if (!user_uid) {
  location = "./auth.html"
}

const userGreetingHeading = document.getElementById("userGreetingHeading");

const auth = getAuth();
let user;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user ==>", user);

    user = user;
    userGreetingHeading.innerText = `Welcome, ${user.email}`
  } else {
    alert("Please Login to your account!")
  }
});

const logoutUser = () => {
  signOut(auth).then(() => {
    alert("Logout Successfull!")
    location = "./auth.html"
  }).catch((error) => {
    console.log("error ==>", error);
  });
}


const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logoutUser)

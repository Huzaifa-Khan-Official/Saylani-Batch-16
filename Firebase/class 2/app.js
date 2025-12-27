import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
import { db } from "./config.js";

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
    location = "./auth.html"
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

const newPostBtn = document.getElementById("newPostBtn");

const createPost = async () => {
  const postInp = document.getElementById("postInp");
  newPostBtn.innerText = "Creating..."
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      user_uid,
      data: postInp.value
    });
    console.log("Document written with ID: ", docRef.id);
    postInp.value = "";
    newPostBtn.innerText = "New Post"
  } catch (e) {
    console.error("Error adding document: ", e);
    newPostBtn.innerText = "New Post"
  }
}

newPostBtn.addEventListener('click', createPost)
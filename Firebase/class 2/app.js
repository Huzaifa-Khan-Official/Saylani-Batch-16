import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
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


// Logout user function
const logoutUser = () => {
  signOut(auth).then(() => {
    alert("Logout Successfull!")
    location = "./auth.html"
  }).catch((error) => {
    console.log("error ==>", error);
  });
}


// Logout Button
const logoutBtn = document.getElementById("logoutBtn");

// logout button click funcion call
logoutBtn.addEventListener("click", logoutUser)

// create post karte waqt ka button
const newPostBtn = document.getElementById("newPostBtn");

// posts ko show karne wala card
const card = document.querySelector(".card");

// tamam ki tamam post, all posts of users (FEED)
const getPosts = async () => {
  card.innerText = "Loading..."
  const usersData = await getDocs(collection(db, "users")); // all users fetched
  usersData.forEach(async (user) => {
    card.innerHTML = "";
    const postsData = await getDocs(collection(db, "users", user.id, "posts"))
    postsData.forEach(async (eachPost) => {
      if (eachPost.data().user_uid === user_uid) {
        card.innerHTML += `
        <p>
          ${eachPost.data().data} 
          <div>
              <button id="editBtn">Edit</button>
              <button>Delete</button>
          </div>
        </p>
        `;
      } else {
        card.innerHTML += `
        <p class="">
          ${eachPost.data().data} 
        </p>
        `;
      }
    })
  });
}

// get posts function call
getPosts()


// create post function
const createPost = async () => {
  const postInp = document.getElementById("postInp");
  if (postInp.value === "") {
    alert("Please write something in the field!")
    return
  }
  newPostBtn.innerText = "Creating..."
  try {
    const docRef = await addDoc(collection(db, "users", user_uid, "posts"), {
      user_uid,
      data: postInp.value
    });
    console.log("Document written with ID: ", docRef.id);
    getPosts()
    postInp.value = "";
    newPostBtn.innerText = "New Post"
  } catch (e) {
    console.error("Error adding document: ", e);
    newPostBtn.innerText = "New Post"
  }
}



// user ki apni posts get karna
const getPostsById = async () => {
  const postsData = await getDocs(collection(db, "users", user_uid, "posts"));
  postsData.forEach(async (post) => {
    console.log("post.id  ==>", post.id);
    console.log("post.data  ==>", post.data());
  })
}

getPostsById()

newPostBtn.addEventListener('click', createPost)
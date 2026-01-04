import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
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
  let allPostHtml = ""
  for (const user of usersData.docs) {
    const postsData = await getDocs(collection(db, "users", user.id, "posts"))
    postsData.forEach(async (eachPost) => {
      if (eachPost.data().user_uid === user_uid) {
        allPostHtml += `
        <div class="post-contianer flex gap-2" id="${eachPost.id}">
          <p>${eachPost.data().data}</p>
          <div>
          <button class="editBtn" data-user-id="${user_uid}" data-post-id="${eachPost.id}" data-post-content="${eachPost.data().data}">Edit</button>
          <button class="deleteBtn" data-user-id="${user_uid}" data-post-id="${eachPost.id}" data-post-content="${eachPost.data().data}">Delete</button>
          </div>
        </div>
        `
      } else {
        allPostHtml += `
        <div class="post-contianer">
          <p>${eachPost.data().data}</p>
        </div>
        `
      }
    })
  }


  card.innerHTML = allPostHtml || "No posts Available"


  document.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const userId = btn.dataset.userId;
      const postId = btn.dataset.postId;
      const postContent = btn.dataset.postContent;

      const updatedPost = prompt("Edit Post", postContent);

      if (!updatedPost || updatedPost === postContent) {
        alert("Can not update your post");
        return
      }
      const postRef = doc(db, "users", userId, "posts", postId);

      await updateDoc(postRef, {
        data: updatedPost
      });

      document.querySelector(`.post-contianer[id='${postId}'] p`).textContent = updatedPost
      alert("Post updated successfully!")
    })
  })

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const userId = btn.dataset.userId;
      const postId = btn.dataset.postId;
      const postContent = btn.dataset.postContent;

      const result = confirm(`Do you really want to delete this post? ${postContent}`);

      console.log("result ==>", result)

      if (result) {
        await deleteDoc(doc(db, "users", userId, "posts", postId));

        document.querySelector(`.post-contianer[id='${postId}']`).remove()
        alert("Post deleted successfully!")
      }
    })
  })
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
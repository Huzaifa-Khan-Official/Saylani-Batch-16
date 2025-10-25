
var users = JSON.parse(localStorage.getItem("usersData")) || [];

function signup() {
  var emailValue = document.getElementById("semail").value;
  var passwordValue = document.getElementById("spassword").value;
  // var user = {};
  // user.email = emailValue;
  // user.password = passwordValue;
  var id;

  // users = [
    // {
    // 	id: 0,
    // 	email: 'use0@gmail.com',
    // 	password: "123456789"
    // },
    // {
    // 	id: 1,
    // 	email: 'use1@gmail.com',
    // 	password: "123456789"
    // },
    // {
    // 	id: 2,
    // 	email: 'use2@gmail.com',
    // 	password: "123456789"
    // }
  // ]

  if (users.length == 0) {
    id = 1
  } else {
    id = users[users.length - 1].id + 1
  }

  var user = {
    id: id,
    email: emailValue,
    password: passwordValue
  }

  users.push(user);

  localStorage.setItem("usersData", JSON.stringify(users));

  location.href = "./login.html"
}

function login() {
  var emailValue = document.getElementById("lemail").value;
  var passwordValue = document.getElementById("lpassword").value;

  // var users = JSON.parse(localStorage.getItem("usersData"));
  var userFound = false;

  // for (var i = 0; i < users.length; i++) {
  //   var user = users[i];
  // }

  for (var index in users) {
    var user = users[index]
    if (user.email == emailValue && user.password == passwordValue) {
      alert("User Authenticated Successfully!")
      userFound = true
      localStorage.setItem("currentUser", JSON.stringify(user))
      location.href = "./index.html"
    }
  }

  if (!userFound) {
    alert("User not found!")
    location.href = "./signup.html";
  }
}

// har aik user ka todo alag alag banega

var users = JSON.parse(localStorage.getItem("usersData")) || [];

function signup() {
  var emailValue = document.getElementById("semail").value;
  var passwordValue = document.getElementById("spassword").value;
  // var user = {};
  // user.email = emailValue;
  // user.password = passwordValue;

  var user = {
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
      location.href = "./index.html"
    }
  }

  if (!userFound) {
    alert("User not found!")
    location.href = "./signup.html";
  }
}

// har aik user ka todo alag alag banega
var loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {
  var lemail = document.getElementById("lemail").value.trim();
  var lpassword = document.getElementById("lpassword").value.trim();

  var usersArr = JSON.parse(localStorage.getItem("users"));

  if (!usersArr || usersArr.length == 0) {
    alert("Please create your account first!");
    return;
  }

  var userFound = false;

  for (var index in usersArr) {
    var user = usersArr[index];
    if (user.email == lemail) {
      if (user.password == lpassword) {
        alert("login successful");
        userFound = true;
        localStorage.setItem("currentUser", JSON.stringify(user))
        location = "../index.html";
      } else {
        alert("Invalid Credentials")
      }
    } else {
      alert("Invalid Credentials")
    }
  }
})
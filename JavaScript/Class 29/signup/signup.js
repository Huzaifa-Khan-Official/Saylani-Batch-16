var singupBtn = document.getElementById("singupBtn");

singupBtn.addEventListener("click", function () {
  var semail = document.getElementById("semail").value;
  var spassword = document.getElementById("spassword").value;

  console.log("email =>", semail);
  console.log("password =>", spassword);
  var usersArr = JSON.parse(localStorage.getItem("users")) || [];

  var id;

  if (usersArr.length == 0) {
    id = 1;
  } else {
    id = usersArr[usersArr.length - 1].id + 1;
  }
  
  var user = {
    id, // id: id
    email: semail,
    password: spassword
  }

  usersArr.push(user);

  localStorage.setItem("users", JSON.stringify(usersArr));

  location = "../login/login.html";
})
// var detail = localStorage.getItem("detail") || [];
var users = JSON.parse(localStorage.getItem("usersData")) || [];


if (location.href == "./index.html") {
  var openTransactionBtn = document.getElementById("openTransactionBtn");
  var addTransactionDiv = document.querySelector(".addTransactionDiv");

  openTransactionBtn.addEventListener("click", function () {
    addTransactionDiv.style.display = "block";
    openTransactionBtn.style.display = "none";
  })

  var addTransactionBtn = document.getElementById("addTransactionBtn");

  addTransactionBtn.addEventListener("click", function () {
    var amountDescription = document.getElementById("amountDescription").value;
    var amountValue = document.getElementById("amountValue").value;

    if (!amountDescription || !amountValue) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
      return;
    }

    console.log("detail ==>", detail);

    addTransactionDiv.style.display = "none";
    openTransactionBtn.style.display = "block";
  })
}


if (location.href.includes("signup.html")) {

  var singupBtn = document.getElementById("singupBtn");

  singupBtn.addEventListener("click", function () {
    var emailValue = document.getElementById("semail").value;
    var passwordValue = document.getElementById("spassword").value;

    if (!emailValue || !passwordValue) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
      return;
    }

    var id;

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

    console.log("users before push ==>", users);

    users.push(user);

    localStorage.setItem("usersData", JSON.stringify(users));
  })
}
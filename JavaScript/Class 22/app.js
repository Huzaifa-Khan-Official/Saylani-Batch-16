// calculator
// todo list
// stop watch
// head tail
// digital watch

// setInterval(function () {
//   var currentTime = new Date();
//   var hour = currentTime.getHours();
//   var minutes = currentTime.getMinutes();
//   var seconds = currentTime.getSeconds();
//   var hourFormat = "am";
//   if (hour > 11) {
//     hourFormat = "pm";
//   }
//   // var hourFormat = "pm";
//   // if (hour < 12) {
//   //   hourFormat = "am"
//   // }

//   console.log("seconds ==>", seconds);
//   console.log("minutes ==>", minutes);
//   console.log("hour ==>", hour);
//   console.log("hourFormat ==>", hourFormat);

// }, 1000)



// var student1 = ["Saim", 19, "Karachi", "Web & App"];
// var student2 = ["Zaryab", 12, "Tariq Road", "Web & App"]

// document.writeln(student1[2])

// Object ==> combination of key values
// key == property
// var obj = {
//   name: "Saim",
//   age: 16,
//   isVerified: true,
//   hobbies: ["cycling", "cricket", "reading"]
// }

// console.log(obj);

// document.writeln(obj);

// for (var value in student1) {
//   console.log("value ==>", student1[value]);
// }

// for (var key in obj) {
//   console.log("key ==>", key, obj[key]);
// }

// document.writeln("name ==>", obj.hobbies[1])
// var obj = {
//   name: "Saim",
//   age: 16,
//   isVerified: true,
//   hobbies: ["cycling", "cricket", "reading"]
// }

// if (obj.age < 18) {
//   // delete obj.isVerified
//   obj.isVerified = false
// }

// obj.address = "Karachi";
// obj.hobbies.push("gaming")

// console.log("obj ==>", obj);


function signup() {
  var email = document.getElementById("semail").value;
  var password = document.getElementById("spassword").value;
  localStorage.setItem("email", email)
  localStorage.setItem("password", password)

  location.href = "./login.html"

  // sessionStorage.setItem("email", email)
  // sessionStorage.setItem("password", password)
}

function login() {
  var email = document.getElementById("lemail").value;
  var password = document.getElementById("lpassword").value;

  if (localStorage.getItem("email") == email && localStorage.getItem("password") == password) {
    alert("Login Successful!");
    location.href = "./index.html";
  } else {
    alert("chal nikal, account bana ke aa....")
    location.href = "./signup.html";
  }
}
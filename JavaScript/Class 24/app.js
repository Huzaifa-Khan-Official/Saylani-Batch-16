// get users from local storage at the global level
// check whether the user already exists in the local storage or not

// Signup
// if user is not in the storage, we will add it in the storage
// users = [user1, user2,  user4, user5]
//          1,      2,       4,     5

// when creating a user, you must provide a unique id to it.

// user = {
//   id: users[users.length - 1].id + 1,
//   email: "user1@gmail.com",
//   password: "123456"
// }

// redirect to login page
// if user is in the storage, we will redirect it to the dashboard page

// todos = [
//   {
//     id: localStorage.getItem("currentUser").id,
//     todosArray: ["todo1", "todo2", "..."]
//   },
// ]


// for (var i = 0; i < 20; i++) {

// }

// var i = 0;
// while (i < 20) {
//   console.log("i ==>", i + 1);
//   i++;
// }

//  var i = 1;
// do {
//   console.log("i ==>", i + 1);
//   i--;
// } while (i > 0)

// console.log("me chala");


// events = triggered

// function fillAreaName() {
//   var postalCode = document.getElementById("postalCode").value;
//   var areaName = document.getElementById("areaName")

//   if (postalCode == "123456") {
//     areaName.value = "Numaish"
//   } else if (postalCode == "75840") {
//     areaName.value = "Metroville"
//   }
// }

function seeMore() {
  var hideContent = document.getElementById("hideContent");
  var seeMoreBtn = document.getElementById("seeMoreBtn");
  if (seeMoreBtn.innerText == "See Less") {
    hideContent.style.display = "none";
    seeMoreBtn.innerText = "See More"
  } else {
    hideContent.style.display = "block";
    seeMoreBtn.innerText = "See Less"
  }
}
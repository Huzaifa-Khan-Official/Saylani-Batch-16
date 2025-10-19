// function goToFacebook() {
//   // location.href = "www.facebook.com"
//   // location.href = "https://www.facebook.com"
//   // location = "https://www.facebook.com"

//   // location = "./about.html"

//   // var currentSite = window.location.hostname;

//   // console.log("currentSite ==>", currentSite);

//   // https://www.google.com
//   // console.log("hostname ==>", location.hostname); www.google.com

//   // https://en.wikipedia.org
//   // console.log("hostname ==>", location.hostname); en.wikipedia.org

//   // location.assign("https://www.facebook.com")

//   var dummyWindow = window.open("", 'mywindow', "width='1100',height=380");
//   var fristName = "Huzaifa"
//   var lastName = "Khan "
//   // var dummyWindowContent = "<ul id='top'><li id='home'>Home" + fristName + " " + lastName + "</li><li ='about'>About</li><li id='services'>Services</li><li id='contact'>Contact</li></ul>"

//   // template literals ``
//   var dummyWindowContent = `
//   Kiya app apna kad bara karna chahte hain, tu abhi baba shah bangali se rabta karain. neeche diye gai number pe kabhi bhi rabta kar sakte hain. 30 din me appka kad bara. GURENTEE
//   `
//   dummyWindow.document.writeln(dummyWindowContent)
// }

// var testPop = window.open("", "", "width=600,height=600");
// console.log("testpop ==>", testPop);


// function register() {
//   var username = document.getElementById("username").value.trim();
//   var email = document.getElementById("email").value.trim();
//   var password = document.getElementById("password").value.trim();

//   // if (username == "" || password == "" || email == "")
//       // false   or false    or true
//   //   false 
//   if (!username || !password || !email) {
//     alert("Please fill the required fields!")
//   } else {
//     console.log(username, email, password);
//   }


// }

function checkForSelection() {
  var cities = document.getElementById("cities");

  if (cities.selectedIndex == 0) {
    alert("Please select a city!")
  } else {
    console.log("check ==>", cities);
  }

}
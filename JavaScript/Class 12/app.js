// Palindrome word ==> civic ==> civic

// take input from user (Done)
// reverse the input 
// check the reverse word with the userInp
// show the output

// console.log("document  ==>", document);


// function checkPalindrome() {
//   var userInp = document.getElementById("userInp").value;
//   var reverse = ""
//   console.log("userInp ==>", userInp);

//   for (var i = userInp.length - 1; i >= 0; i--) {

//     console.log("i ==>", userInp[i]);
//     // reverse += userInp[i]
//     reverse = reverse + userInp[i]
//   }

//   console.log("reverse ==>", reverse);

//   if (userInp === reverse) {
//     document.write("It is a palindrome word")
//   } else {
//     document.write("It is not a palindrome word!")
//   }


// }

// var arr = [3, 6, 5, 2, 1, 9, 7, 8];
// var min = arr[0] // 3

// for (var i = 0; i < arr.length; i++) {
//   // console.log("min ==>", min);
//   // console.log("currentElement ==>", arr[i]); // arr[0] (3), arr[1] (6)
//   if (arr[i] < min) {
//     min = arr[i]
//   }
// }

// console.log("min ==>", min);

// var arr = ["This", "is", "Pakistan"] // This is Pakistan


// function myFunction(waqar) {
//   // var text = arr[0];
//   // for (var i = 1; i < arr.length; i++) {
//   //   text = text + separator + arr[i]
//   // }

//   // return text;
//   var text = "";
//   for (var i = 0; i < arr.length; i++) {
//     if (i === 0) { 
//       text = text + arr[i] //text = "" + This == This
//     } else {
//       text = text + waqar + arr[i];
//     }

//   }

//   return text;
// }

// var result = myFunction("+++++");

// console.log("result ==>", result);


// console.log("text ==>", text);

// console.log("result ==>", arr.join());

function fifo() {
  var userInp = document.querySelector(".userInp").value;
  var arr = userInp.split(",")
  var output = document.getElementById("output");

  for (let i = 0; i < arr.length; i++) {
    var element = arr[i];
    console.log("element ==>", element);
    // output.innerHTML = "<b>" + element + "</b>"
    // output.innerText += element
    output.innerText = output.innerText + " " + element

  }


}
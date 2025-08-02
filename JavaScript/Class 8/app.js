// var city = ["karachi", "lahore", "islamabad", "peshawar", "quetta"]

// city.splice(2, 1, "numaish", "Mazar")
// console.log(city);

// var newArr = city.slice(2)
// var newArr = city.slice(2, 4)
// var newArr = city.slice(0, 4)

// console.log(city.length);
// console.log(newArr);



// city.push("numaish")
// city.push("korangi")
// console.log(city);

// city.pop()

// city.unshift("Mazar")
// console.log(city);

// city.shift()
// console.log(city);


// var text = "Muhammad Huzaifa"
// var toFound = "a"
// var isFound = false
// var index = -1


// for (var i = 4; i < text.length; i++) {
//   if(toFound == text[i]) { // w == 
//     isFound = true
//     index = i
//     break
//   }
// }

// if (isFound) {
//   console.log("Element found at index: " + index);
// } else {
//   console.log("Not found " + index);
// }

// var text = "Muhammad Huzaifa Muhammad"
// var toFound = "Muhammad"
// var isFound = false
// var index = -1


// for (var i = 1; i < text.length; i++) {
//   console.log(text.slice(i, i + toFound.length));
//   // text.slice(0, 8) (Muhammad)
//   // text.slice(1, 9) (uhammad )
//   // text.slice(2, 10) (hammad H)
  
//   if (toFound == text.slice(i, i + toFound.length)) {
//     isFound = true
//     index = i
//     break
//   }
//   // if(toFound == text[i]) { // Muhammad == text[i]
//   //   isFound = true
//   //   index = i
//   //   break
//   // }
// }

// if (isFound) {
//   console.log("Element found at index: " + index);
// } else {
//   console.log("Not found " + index);
// }


// console.log(text.indexOf("Muhammad", 1)); 



var userInp = prompt("Enter your choise (Head/Tails):")
var result = Math.round(Math.random() * 1);
if (result == 1 && userInp == "Head") {
  console.log("You win");
} else {
  console.log("You loss");
}

console.log("result ==>" + result);
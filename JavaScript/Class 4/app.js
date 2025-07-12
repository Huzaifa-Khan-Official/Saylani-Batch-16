var flag = false;

// javascript has 6 falsy values
// "" ==> empty string
// 0 ==> zero
// false
// undefined
// NaN ==> Not a Number
// null


// ! changes the boolean sign
// !true == false
// !false == true

// if (flag) {
//   console.log("flag ==>", 15)
// }

// {} ==> scope

// var a = 3
// var b = 4


// comparision operators gives the true/false
// a < b ==> 3 < 4 ==> true

// if (!(a < b)) {
//   console.log("a is smaller than b");
// } else {
//   console.log("else is running");
// }

// var a = 3
// var b = 4

// if (a != b) {
//   console.log("a is not equal to b");
// }

// if (a <= b) {
//   console.log("a is less than or equal to b");
// }


// comparision operators

// <
// >
// <=
// >=
// == 
// ===
// !=

// conditional operators
// && ===> And operator
// || ==> Or operator


// var firstName = "Huzaifa"
// var lastName = "Khan"
// var age = 21

// var arr = ["Huzaifa", "Khan", 21, true]
//            0     ,  1,     2,  3

// in array, index starts from 0

// console.log(arr[0] + " " + arr[1] + " " + arr[3]);

// console.log(arr[2], arr[1]);

// document.write(arr);

var arr = ["Huzaifa", "Khan", 21, true, "Rehman", "Faizan", "Jameel", "Usman"]

// arr.push("Rehman")
// arr.push("sara")
// arr.push("Faizan")

// arr.pop()
// arr.pop()

// arr.unshift("Areeba")
// arr.unshift("Faizan")

// arr.shift()

// arr.push("Sara")
// arr.push("Faizan")

// arr.splice(5, 0, "Amna", "Hasnain")
              // starting index, number of deletion, element to be inserted at the starting index



document.write(arr);

// 6 basic methods of array
// push ==> adds element to the last of array
// pop ==> removes last element from the array
// unshift ==> adds the element at the start of array.
// shift ==> removes the first element from the array
// splice ==> add, remove, at any index of the array
// slice ==> Returns a copy of a section of an array.
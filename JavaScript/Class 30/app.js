
// ReDeclaration
// var num1 = 30

// console.log("num1 ==>", num1);

// var num1 = 40;

// console.log("num1 ==>", num1);

// let num1 = 30

// console.log("num1 ==>", num1);

// let num1 = 40;

// console.log("num1 ==>", num1);

// const num1 = 30
// console.log("num1 ==>", num1);
// const num1;

// Reassignment 
// var firstName = "Ahmed"
// console.log("name ==>", firstName);
// firstName = "Khan"
// console.log("name ==>", firstName);
// let firstName = "Ahmed"
// console.log("name ==>", firstName);
// firstName = "Khan"
// console.log("name ==>", firstName);
// const firstName = "Ahmed"
// console.log("name ==>", firstName);
// firstName = "Khan"
// console.log("name ==>", firstName);

// Function Scope
// function fullName() {
//   // var firstName = "Ahmed";
//   // var lastName = "Khan";
//   let firstName = "Ahmed";
//   console.log("firstName ==>", firstName);
//   const lastName = "Khan";
//   console.log("lastName ==>", lastName);
// }
// fullName();
// console.log("lastName ==>", lastName);


// Block Scope
// if (10 > 9) {
//   // var num1 = 11;
//   let firstName = "my Name"
//   const lastName = "my Name"
// }

// // console.log("num1 ==>", num1);
// // console.log("firstName ==>", firstName);
// console.log("lastName ==>", lastName);

// const num1 = 10;
// function fullName() {
//   if (10 < 11) {
//     console.log("num1 in firstBLock ==>", num1);
//     if (true) {
//       console.log("num1 in secondBLock ==>", num1);
//     }
//   }
// }

// fullName()

// Hoisting
// x = 20

// console.log(`num1 in starting ${x}`);

// let x = 10;

// console.log(`num1 in ending ${x}`);


// const firstName = "Karachi"

// if (true) {
//   var num1 = 10
// }

// console.log(window);


// var fullName = "alsdflsdfjlj"


console.log("Global Execution context Starts");

var globalVar = "I am a global variable";

function globalFunction() {
  console.log("Inside global function");
}

console.log(globalVar);
globalFunction();

console.log("Global Execution Context Ens");



// var arr = ["Bilal", "Maaz", "Arshad", "Mujeeb", "Hadi", "Suleman"]; // arr initialization
// index starts from 0, total index ==> 3
// length starts from 1, total length ==> 4

// arr.push("Atta ur Rehman")
// arr.push("Shahzaib")

// document.write("Array starting: ",arr)

// arr.pop()
// arr.pop()

// document.write('</br>After using pop method: ' + arr)

// arr.unshift(123, 345, 5678)

// document.write("</br>After using unshift method: " + arr)

// arr.shift()

// document.write("</br>After using shift method: " + arr)

// arr.splice(2, 1, "Hunain", "Saim")

// document.write("</br>After using splice method: " + arr)

// var arr2 = arr.slice(3, 6);
// if the value is not provided to the slice method, it considers it as 0 (starting index): arr.slice()

// if we provide only one value to slice method, it copies the element from that index, to the last element: arr.slice(3)

// if we provide the ending index, it will consider it as n - 1: arr.slice(3, 6) ==> 3, 4, 5

// after using slice the orignal array remains the same

// document.write("</br>Arr2: " + arr2);
// document.write("</br>Arr(Orignal Array): " + arr)

// document.write("Hello World!")

// 3 basic loops are in JS
// for loop
// while loop
// do while loop

// for loop
// variable initialization
// condition checking
// increment/decrement

// if () {

// }

// var a; // variable declaration

// var a = 1; // variable initialization

// initialization
// condition checking
// block scope
// increment

// condition checking
// block scope
// increment

// condition checking
// block scope
// increment

// codition checking (false)

// for (a; a < 5; a++) {
//   document.write("</br>" + a + "Hello World!") // 0Hello World
//   // 1Hello World
//   // 2Hello World
//   // 3Hello World
//   // 4Hello World
// }

// var a = 5

// for (a; a >= 1; a--) {
//   document.write("</br>" + a + ") Hello world!")
// }

var table = 2;
// 2 x 1 = 2
// document.write(table + " x " + multiple + " = " + result)

for (var multiple = 1; multiple <= 10; multiple++) {

  var result = table * multiple;

  document.write("</br>" + table + " x " + multiple + " = " + result)
}
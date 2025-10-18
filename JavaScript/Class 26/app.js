// document.body.innerHTML = "Huzaifa"

// document.innerHTML = "Huzaifa"

// console.log("document ==>", document.body);

// var sum = 0
// for (var i = 1; i < 10; i += 2) {
//   sum += i;
// }

// console.log("sum ==>", sum)

// var a;
// console.log(a);


// var x = 1;
// function test() {
//   console.log(x);
//   var x = 2;
// }

// test();

// function test(a) {
//   return a * 2
// }

// console.log(test());

// let a;
// console.log(a);

// var obj = {
//   property/key: value,
// }

// var obj = {
//   name: "Hamza",
//   name: "Bilal",
//   fatherName: "xyz",
//   getDetails: function () {
//     return obj.name
//   } 
// }


// obj.fatherName = "abc"
// var currentTime = new Date();

// obj.getDetails = function () {
//   return obj.fatherName;
// }

// console.log("currentMonth ==>", currentTime.getMonth());


// console.log("obj ==>", obj.getDetails());

var obj = {
  name: "Hamza",
  fatherName: "abc",
  age: 18,
  isEligible: false,
  hobbies: ["game", "football"],
  getDetails: function () {
    return this.name + ", " + this.fatherName
  },
}

// obj.schools.schoolName = "SMIT";
obj.getDetails.schoolName = "SMIT";

console.log("obj ==>", obj.getDetails.schoolName);


// var obj2 = {
//   name: "Bilal",
//   fatherName: "xyz",
//   getDetails: function () {
//     return obj.name + ", " + obj.fatherName
//   }
// }

// console.log("getDetails ==>", obj);
// console.log("getDetails ==>", obj2.getDetails());


// console.log("this ==>", this);

const student = { // 123
  fullName: "Abc",
  age: 28
}
// Object.freeze(student) // it doesn't allow you to delete, update, and add the values of an object
// delete student.age
// student.address = "Karachi"
// console.log("studen1 ==>", student);

// Object.seal(student)
// student.address = "Karachi";
// student.fullName = "XYZ"
// delete student.fullName
// console.log("student ==>", student);




// delete student.age

const student2 = { ...student }  // 456  // it only copies the values, not the reference
// const student2 = student // 123 // it copies the reference of other object

// console.log("name ==>", student.fullName);
// console.log("name ==>", student["fullName"]);
// student.address = "Karachi";
// console.log("student ==>", student);

// student2.fullName = "XYZ"
// delete student.age
// console.log("studen1 ==>", student);
// console.log("studen2 ==>", student2);
// console.log("isEqual ==>", student == student2);

const keys = Object.keys(student) // it returns the array of keys of an object
const values = Object.values(student); // it returns the array of values of an object
const entries = Object.entries(student); // it returns the array of key and values
// console.log("keys ==>", keys);
// console.log("values ==>", values);
// console.log("entries ==>", entries);

// const student3 = Object.assign({}, student);
// student3.nestedObj = {
//   className: "Web & MObile App",
//   timing: "9 - 3"
// }
// console.log("isEqual ==>", student === student3);

// console.log("studen3 ==>", student3);



// for (const myKey in student) {
//   console.log("key ==>", myKey, student[myKey]);
// }



// SET
// const set1 = new Set(); // symbol {}
// set1.add(2)
// set1.add(3)
// set1.add(2)
// set1.add(3)
// set1.add(1)
// console.log("set1 ==>", set1);
// const set2 = new Set([1, 2, 4, 2, 3, 1])
// // console.log("set2 ==>", set2);
// // console.log("set2 length ==>", set2.size);
// console.log(set2.has(6));

// const users = ["ali", "abc", "faizan", "ali", "sudais"];
// const uniqueUsers = new Set(users);

// console.log("uniqueUsers ==>", uniqueUsers);

const userAges = new Map();
userAges.set("Ali", 26)
userAges.set("Sudais", 11);
userAges.set(20, "Bilal")

console.log("userAges ==>", userAges);
console.log("specific userAge ==>", userAges.get(20));

const user = [
  ["fullName", "ABC"],
  [26, "Karachi"],
  [26, "Numaish"]
]
const currentUserSession = new Map(user)
console.log("currentUser ==>", currentUserSession);
currentUserSession

// localStorage.setItem()






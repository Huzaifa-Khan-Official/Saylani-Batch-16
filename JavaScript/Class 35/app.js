// var obj1 = {
//   name: "Student 1",
//   age: 26,
//   classDetail: { // street 2
//     className: "Web & MObile App",
//     timing: "12 - 3",
//     carDetail: {
//       model: 2001,
//       name: "Daala"
//     }
//   }
// }

// var obj2 = { ...obj1 }
// obj2.classDetail = { ...obj1.classDetail }
// obj2.classDetail.carDetail = { ...obj1.classDetail.carDetail }
// obj2.name = "Student 2";
// obj2.classDetail.className = "Animation"
// obj2.classDetail.carDetail.name = "Civic"
// console.log("obj1 ==>", obj1);
// console.log("obj2 ==>", obj2);


// const map1 = new Map();
// map1.set(true, "Huzaifa");
// map1.set(true, "Faizan")

// console.log("map1 ==>", map1);

// const map1 = new Map();
// map1.set({}, "Huzaifa"); // street 2
// map1.set({}, "Faizan"); // street 3
// map1.set([], "Bilal")
// map1.set([], "Sudais")

// console.log("map1 ==>", map1);

// const map1 = new Map();
// map1.set({}, "Huzaifa"); // street 2
// map1.set({}, "Faizan"); // street 3
// // map1.set([], "Bilal")
// // map1.set([], "Sudais")

// console.log("map1 ==>", map1.size);

// const set1  = new Set();
// console.log(set1.size);



// Advanced Array Methods
// const arr = [1, 2, 4, 6, 5];

// arr.forEach(elem => {
//   console.log("elem ==>", elem);
//   const myVar = "Abc"
// })

// const filteredArr = arr.filter(value => value > 2); // [4, 6, 5]
// console.log("filteredArr ==>", filteredArr);
// const users = [
//   {
//     name: "user1",
//     status: "online"
//   },
//   {
//     name: "user2",
//     status: "offline"
//   },
//   {
//     name: "user3",
//     status: "online"
//   },
// ]

// const onlineUsers = users.filter(curentUser => curentUser.status == "online")
// console.log("onlineUsers ==>", onlineUsers);

// const prices = [
//   {
//     name: "Laptop",
//     price: 50000
//   },
//   {
//     name: "Mobile",
//     price: 20000
//   },
//   {
//     name: "Bike",
//     price: 30000
//   },
// ]

// const filteredProducts = prices.filter(product => product.price > 20000) // [{
//   //   name: "Laptop",
//   //   price: 50000
//   // },
//   // {
//   //   name: "Bike",
//   //   price: 30000
//   // },
//   // ]
//   console.log(filteredProducts);

// const arr1 = [1, 3, 2];

// const doubled = arr1.map


// 1) forEach // true
// 2) map // true
// 3) filter // true
// 4) reduce
// 5) find // true
// 6) findIndex // true
// 7) some
// 8) every
// 9) sort // true
// 10) reverse // true
// 11) flat
// 12) flatMap
// 13) slice // true
// 14) splice // true
// 15) join // true
// 16) concat // true
// 17) fill
// 18) from
// 19) isArray // true

// console.log([1, 2, 4].join("-"))
// console.log(["ABC", "DEF"].concat("XYZ"))
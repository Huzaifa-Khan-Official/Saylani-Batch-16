// const person = {
//   firstName: "ABC",
//   lastName: "DEF",
//   fullName: function () {
//     return `${this.firstName} ${this.lastName}`
//   }
// }

// console.log("fullname ==>", person.fullName())

// const person1 = {
//   firstName: "ABC",
//   lastName: "DEF",
// }

// const person2 = {
//   firstName: "RST",
//   lastName: "XYZ",
// }

// const person = {
//   fullName: function (a, b) {
//     return `${a}, ${this.firstName} ${this.lastName}. ${b}`
//   }
// }

// // calls substituting another object in the current object.
// console.log(person.fullName.call(person1, "Hello", "How are you?"));
// console.log(person.fullName.call(person2, "Hello", "How are you?"));



// // console.log(person.fullName.apply(person1, ["Hello", "How are you?"]));
// // console.log(person.fullName.apply(person2, ["Hello", "How are you?"]));


// // console.log(Math.max(2, 4, 5, 1))
// // console.log(Math.max([2, 4, 5, 1]))

// // console.log(Math.max.apply(null, [2, 4, 5, 1]));



// const greetings = function (a, b) {
//   return `${a}, ${this.firstName} ${this.lastName}. ${b}`
// }

// const bound = greetings.bind(person1);

// console.log("output ==>", bound("Hello", "How are you?"))


// ============ EVENT LOOP =============

// console.log("Start running");

// setTimeout(() => {
//   console.log("running in setTimeout");
// }, 0)

// Promise.resolve().then(() => {
//   console.log("running in Promise");
//   Promise.resolve().then(() => {
//     console.log("running in Promise 2");
//     Promise.resolve().then(() => {
//       console.log("running in Promise 3");
//       Promise.resolve().then(() => {
//         console.log("running in Promise 4");
//       })
//     })
//   })
// })
// // Promise.resolve().then(() => {
// //   console.log("running in Promise 2");
// // })

// setTimeout(() => {
//   console.log("running in setTimeout 2");
// }, 0)

// console.log("End running");


function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next() {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
  return rangeIterator;
}

const iter = makeRangeIterator(1, 10, 2);

// let result = iter.next();

console.log("result ==>", iter.next());
console.log("result ==>", iter.next());
console.log("result ==>", iter.next());
console.log("result ==>", iter.next());
console.log("result ==>", iter.next());
console.log("result ==>", iter.next());

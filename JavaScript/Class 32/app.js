// const student = {
//   fullName: "Bilal Khan",
//   age: 16,
//   address: "Numaish",
//   classDetails: {
//     courseName: "Web & Mobile App",
//     classTiming: "12 se 3"
//   }
// }

// let address = "Karachi"

// const { fullName, age, address: studentAddress = "Karachi", classDetails } = student;

// const { courseName } = classDetails;
// const { fullName, age, address: studentAddress = "Karachi", classDetails: { courseName, classTiming } } = student;

// console.log(student.fullName);
// console.log(student.age);
// console.log(student.address);
// console.log(student.classDetails.courseName);

// console.log(courseName);
// console.log(classTiming);
// console.log(fullName);
// console.log(studentAddress);
// console.log(age);

// const student = {
//   fullName: "Bilal Khan",
//   age: 16,
//   address: "Numaish",
//   classDetails: {
//     courseName: "Web & Mobile App",
//     classTiming: "12 se 3"
//   }
// }
// let address = "Karachi"
// const { address: studentAddress } = student

// console.log(studentAddress);


// const propertyName = "address"
// const { [propertyName]: myVariable } = student;

// console.log(myVariable);

// const nums = [23, 43, 56, 28];
// let num1 = 5;

// const [num1: myNum, num2, num3, num4, num5 = 1] = nums

// console.log(num1);
// console.log(num2);
// console.log(num3);
// console.log(num4);
// console.log(num5);

// console.log(num1 + num5);


// Rest Operator
// const addition = (a, b, c, ...restValue) => {

//   console.log("restValue ==>", restValue);
  
//   return a + b + c
// }

// console.log("result ==>", addition(2, 2, 2, 34, 45, 67));

// Spread Operator
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const resultArr = [...arr1, ...arr2];
// console.log("resultArr ==>", resultArr);



// const obj1 = {
//   name: "Bilal",
//   address: "Numaish"
// }

// const obj2 = {
//   name: "Sudais",
//   address: "Tariq Road"
// }

// const resultObj = {...obj1, ...obj2}


// console.log("resultObj ==>", resultObj);

// orignalArr = [1, 2, 3]; // abc123
// coppiedArr = undefined // abc123;

// const orignalArr = [1, 2, 3];
// const coppiedArr = orignalArr; 

// coppiedArr.push(6, 7, 8);

// console.log("orignalArr ==>", orignalArr);
// console.log("coppiedArr ==>", coppiedArr);

// const orignalArr = [1, 2, 3];
// const coppiedArr = [...orignalArr]; 

// coppiedArr.push(6, 7, 8);

// console.log("orignalArr ==>", orignalArr);
// console.log("coppiedArr ==>", coppiedArr);


// Default Parameters

// name = "Huzaifa"

// const add = (a, b = 2, c = 0, d = 2) => {
//   return a + b + c + d;
// }

// console.log("addition ==>", add(2));

// console.log("name ==>", name);


// Closures
// const function1 = () => {
//   const num1 = 20;
//   // window // function1 
//   const function2 = () => {
//     // window // function1 // function2
//     const num2 = 30;
//     return num1 + num2
//   }
//   return function2
// }

// const result = function1();

// console.log("rusult ==>", result);
const addToNum = (number) => {
  return (num1) => {
    return num1 + number
  }
}
const add5Num = addToNum(5);
console.log("add5Num ==>", add5Num(15));
console.log("add5Num ==>", add5Num(10));
console.log("add5Num ==>", add5Num(5));
console.log("add5Num ==>", add5Num(25));
console.log("add5Num ==>", add5Num(35));

// const add10Num = addToNum(10);
// console.log("add10Num ==>", add10Num(35));

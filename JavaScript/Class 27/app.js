// var student1 = {
//   name: "Bilal",
//   class: "2nd year"
// }
// var student1 = {
//   name: "Bilal",
//   class: "2nd year"
// }

var student = {
  name: "Bilal",
  class: "2nd year"
}

student.address = "sdfsdf"

// function Student (name, className) {
//   this.name = name;
//   this.className = className;
//   this.getDetails = function () {
//     return name + ", " + className
//   }
// }

// console.log("Student1 ==>", Student("Bilal", "2nd year"));
// console.log("Student1 ==>", Student("Sudais", "1st year"));
// console.log("Student1 ==>", Student("Faizan", "2nd year"));

// console.log("Student1 ==>", new Student("Bilal", "1st year"));
// console.log("Student2 ==>", new Student("Sudais", "2nd year"));
// console.log("Date ==>", new Date());

function Student(name, className) {
  this.name = name;
  this.className = className;
  this.getDetails = function () {
    return name + ", " + className
  }
}

// var student1 = new Student("Bilal", "6th Class");
// var student2 = new Student("Khan", "10th Class");
// console.log("student1 ==>", student1.getDetails());
// console.log("student2 ==>", student2.getDetails());


// console.log("Student1 ==>", new Student("Bilal", "6th Class").getDetails());
// console.log("Student2 ==>", new Student("Khan", "10th Class").getDetails());


// console.log(Student());


// function Add(num1Value, num2Value) {
//   this.num1 = num1Value;
//   this.num2 = num2Value;
//   this.calculate = function (num1Value, num2Value) {
//     return num1Value + num2Value
//   }
// }

// var calculation1 = new Add(2, 2); // {num1: 2, num2: 2}
// var calculation2 = new Add(3, 3);

// console.log("Answer ==>", calculation1.calculate(4, 4));
// console.log("calculation1 ==>", calculation1);


// function Add(num1Value, num2Value) {
//   this.num1 = num1Value;
//   this.num2 = num2Value;
//   // this.calculate = function () {
//   //   return this.num1 + this.num2
//   // }
// }



// var calculation1 = new Add(2, 2); // {num1: 2, num2: 2, calculate()}
// var calculation2 = new Add(12, 24); // {num1: 12, num2: 24, calculate()}

// console.log("Answer ==>", calculation1.calculate());
// console.log("calculation1 ==>", calculation1);

// console.log("Answer ==>", calculation2.calculate());


// function Add(num1Value, num2Value) {
//   this.num1 = num1Value;
//   this.num2 = num2Value;
// }

// Add.prototype.calculate = function () {
//   return this.num1 + this.num2
// }


// var calculation1 = new Add(2, 2); // {num1: 2, num2: 2, calculate()}
// var calculation2 = new Add(12, 24); // {num1: 12, num2: 24, calculate()}
// console.log("calculation1 ==>", calculation1.calculate());
// console.log("Answer ==>", calculation2.calculate());

// console.log("calculation1 ==>", calculation1);

// console.log("isCalculate Method Available ==>", "calculate" in calculation1);

// var arr = []
// console.log("arr ==>", arr);


console.log("window ==>", location.pathname);

function reloadFunc() {
  location.reload();
}
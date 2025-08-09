// var currentTime = new Date();
// var year = currentTime.setFullYear(2010)
// currentTime.setMonth(2)

// var hour = currentTime.getHours();
// var seconds = currentTime.getSeconds()

// console.log("currentTime ==>", currentTime);
// console.log("year ==>", year);
// console.log("hour ==>", hour);


// function fullName() {} // function declaration / function initialization / fuctin definition
// function fullName() {
//   var firstName = "Huzaifa"
//   var lastName = "Khan"

//   var fullName = firstName + lastName
//   console.log("fullName ==>", fullName);
// }


// alert()
// fullName() // function calling

// function fullName(firstName, lastName) { // function parameters
//   var fullName = firstName + " " + lastName
//   // return fullName
//   return firstName + " " + lastName
// }

// alert("")
// var firstName = "Huzaifa"
// var lastName =  "Khan"
// var student1 = fullName(firstName, lastName)  // argument
// var student2 = fullName("Bilal", "Khan") // argument
// var student3 = fullName("Abdur", "Rehman") // argument
// var student4 = fullName("Laiba", "Rehman") // argument

// console.log("student1 ==>", student1);
// console.log("student2 ==>", student2);
// console.log("student3 ==>", student3);
// console.log("student4 ==>", student4);

// var num = 123

// function addition() {
//   var num = 456 
//   console.log("num ==>", num);
//   console.log("num ==>", num);
// }


// addition()

// console.log("num ==>", num); 

// hoisting
// {
//   var num1 = 1
//   {
//     var num2 = 2
//     {
//       var num3 = 3
//     }
//     console.log("num1 ==>", num1);
//     console.log("num2 ==>", num2);
//     console.log("num3 ==>", num3);
//   }
// }

// function addition() {
//   var sum = 1 + 2
//   return sum
// }

// var sum = addition();

// console.log("sum ==>", sum);

var day = prompt("Enter day today: ");

// if (day == "sat" ||  day == "sun") {
//   console.log("Class leni hai");
// } else if (day == "fri") {
//   console.log("Naha lo bhai");
// } else {
//   console.log("Parhai Karni hai");
// }

switch (day) {
  case "sat":
    console.log("Class leni hai");
    break
  
  case "sun":
    console.log("Class leni hai");
    break

  case "fri":
    console.log("Naha lo bhai");
    break

  default:
    console.log("Parhai Karni hai");

}

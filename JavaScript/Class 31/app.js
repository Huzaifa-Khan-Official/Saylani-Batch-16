var firstName = "Khan";

// try {
// } catch (error) {
//   console.log("error ==>", error);
// }
// try {
//   consol.log("fistName ==>", firstName)
// } catch (myError) {
//   console.log("myError ==>", myError);
// }

// try {
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))
// } catch (error) {
//   console.log("error i fecthing data ==>", error);
// }

// var greeting = "Hello world!";
// aler(greeting);

// try {
//   var greeting = "Hello world!";
//   aler(greeting);
// }
// catch (err) {
//   alert(err);
// }


// var signup = document.getElementById("signup")

// signup.addEventListener("click", function () {
//   var email = document.getElementById("email").value;
//   var phoneNumber = document.getElementById("phoneNumber").value;
//   var password = document.getElementById("password").value;

//   var emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   var phoneNumberRegex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

//   try {
//     // console.log("emailRegex.test(email) ==>", emailRegex.test(email));
//     // console.log("phoneNumberRegex.test(phoneNumber) ==>", phoneNumberRegex.test(phoneNumber));

//     if (!emailRegex.test(email) || !phoneNumberRegex.test(phoneNumber)) {
//       console.log("inside the condition");
//       throw "Email or phone number is not correct";
//     }

//     // registraion ka sara kaam chal raha hai.

//     alert("Registration Successfull!")  
//   } catch (error) {
//     console.log("error while registraion ==>", error);
//   }
// })

// signup.addEventListener("click", () => {
//   var email = document.getElementById("email").value;
//   var phoneNumber = document.getElementById("phoneNumber").value;
//   var password = document.getElementById("password").value;

//   var emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   var phoneNumberRegex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

//   try {
//     // console.log("emailRegex.test(email) ==>", emailRegex.test(email));
//     // console.log("phoneNumberRegex.test(phoneNumber) ==>", phoneNumberRegex.test(phoneNumber));

//     if (!emailRegex.test(email) || !phoneNumberRegex.test(phoneNumber)) {
//       console.log("inside the condition");
//       throw "Email or phone number is not correct";
//     }

//     // registraion ka sara kaam chal raha hai.

//     alert("Registration Successfull!")  
//   } catch (error) {
//     console.log("error while registraion ==>", error);
//   }
// })


// function add(num1, num2) {
//   return num1 + num2;
// }

// const add = (num1, num2) => num1 + num2

// console.log("output ==>", add(2, 2));

// const greet = name => alert(name);

// greet("Khan")

function Student(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

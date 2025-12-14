// class User {
//   #password;
//   constructor(email, password) {
//     this.email = email;
//     this.#password = password
//   }

//   get getPassword() {
//     return this.#password
//   }

//   set setPassword(updatedPassword) {
//     this.#password = updatedPassword
//   }
// }

// const user1 = new User("user1@gmail.com", "12456789");
// // console.log("user ==>", user1.password);
// console.log("user ==>", user1.getPassword);
// user1.setPassword = "Huzaifa@123"
// console.log("user ==>", user1.getPassword);



// Typescript

function greetings(name) {
  return `Hello, Mr/Ms. ${name}, How are you today?`
}


console.log(greetings("ABC"))
console.log(greetings(123456))
console.log(greetings(true))
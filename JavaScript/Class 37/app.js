// Promise
// const pro = new Promise((res, rej) => {
//   const isVerified = false;
//   if (isVerified) {
//     res("User is verified")
//   } else {
//     rej("user is not verified")
//   }
// })


// pro.then((msg) => {
//   console.log("msg ==>", msg);
// }).catch((error) => {
//   console.log("error ==>", error);

// }).finally(() => {
//   console.log("promise is fully completed!");
// })



// console.log("Me chala")


fetch("https://jsonplaceholder.typicode.com/photdfsfos")
  .then(data => data.json())
  .then(response => console.log("response ==>", response[0].thumbnailUrl))
  .catch(err => console.log("error ==>", err))



// fetch('https://jsonplaceholder.typicode.com/todos')
//   .then(data => data.json())
//   .then(data => console.log(data))
//   .catch(err => console.log("error ===>", err))

// const getTodos = new Promise((res, rej) => {
// })


// pro.then((msg) => {
//   console.log("msg ==>", msg);
// }).catch((error) => {
//   console.log("error ==>", error);

// }).finally(() => {
//   console.log("promise is fully completed!");
// })



console.log("Me chala")
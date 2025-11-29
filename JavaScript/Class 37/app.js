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


// fetch("https://jsonplaceholder.typicode.com/photdfsfos")
//   .then(data => data.json())
//   .then(response => console.log("response ==>", response[0].thumbnailUrl))
//   .catch(err => console.log("error ==>", err))



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



// console.log("Me chala")

const main = document.querySelector(".main");

main.innerHTML = "Loading..."

setTimeout(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(data => data.json())
  .then(res => {
    // console.log("res ==>", res);
    main.innerHTML = ""
    res.map(post => {
      console.log("post ==>", post);
      main.innerHTML += `
      <div class="card">
        <h1>${post.title}</h1>
        <p>${post.body}</p>
      </div>
      `
    })
  })
  .catch(err => main.innerHTML = "Something went wrong, Please try later!")
}, 5000)

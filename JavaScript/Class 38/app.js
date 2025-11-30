// console.log("Task 1"); // 1 sec
// console.log("Task 2"); // 5 sec
// console.log("Task 3"); // 1 sec


// console.log("1st task");

// setTimeout(() => {
//   console.log("2nd task");
// }, 0) // task queue

// setTimeout(() => {
//   console.log("4th task");
// }, 0) // task queue

// // event loop

// console.log("3rd task");


// console.log("Loader");

// const getUsers = new Promise((res, rej) => {
//   const isVerified = true;
//   setTimeout(() => {
//     if (isVerified) {
//       res([
//         {
//           id: 1,
//           name: "User1"
//         },
//         {
//           id: 2,
//           name: "User2"
//         }
//       ])
//     } else {
//       rej("You are not verified to access the users.")
//     }
//   }, 0)
// })


// console.log(getUsers);

// getUsers.then((response) => console.log("response ==>", response)
// ).catch((err) => console.log("error ==>", err))

// function resolveAfter2Seconds() {
//   return new Promise((resolve, rej) => {
//     const isVerified = true;
//     setTimeout(() => {
//       if (isVerified) {
//         resolve([
//           {
//             id: 1,
//             name: "User1"
//           },
//           {
//             id: 2,
//             name: "User2"
//           }
//         ])
//       } else {
//         rej("You are not verified to access the users.")
//       }
//     }, 5000)
//   });
// }

// async function asyncCall() {
//   console.log("calling");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   console.log("waiting for result")
// }

// asyncCall();

// const getData = async () => {
//   try {
//     const result = await getUsers;
//     console.log("result ==>", result);
//   } catch (error) {
//     console.log("error ==>", error)
//   }
// }

// getData()

// console.log("remaining tasks");



// api key = 

// https://newsapi.org/v2/everything?q=tesla&from=2025-10-30&sortBy=publishedAt&apiKey=API_KEY

// fetch("https://newsapi.org/v2/everything?q=tesla&from=2025-10-30&sortBy=publishedAt&apiKey=API_KEY")
// .then(res => res.json())
// .then(data => console.log("data ==>", data))
// .catch(err => console.log("err ==>", err))

const main = document.querySelector(".main");

const getNews = async () => {
  try {
    const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=API_KEY")
    const data = await res.json();
    const news = data.articles;

    news.map((eachNews) => {
      main.innerHTML += `
      <a class="card" style="width: 18rem;" href="${eachNews.url}">
        <img src="${eachNews.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${eachNews.title}</h5>
          <p class="card-text">${eachNews.description}</p>
          <div>
          <p>${eachNews.author}</p>
          <p>${eachNews.publishedAt}</p
          </div>
        </div>
      </div>
      `
    })
  } catch (error) {
    console.log("error ==>", error);
  }
}

const getSerachedNews = async (query) => {
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=API_KEY`)
    const data = await res.json();
    const news = data.articles;

    main.innerHTML = "";

    news.map((eachNews) => {
      main.innerHTML += `
      <a class="card" style="width: 18rem;" href="${eachNews.url}">
        <img src="${eachNews.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${eachNews.title}</h5>
          <p class="card-text">${eachNews.description}</p>
          <div>
          <p>${eachNews.author}</p>
          <p>${eachNews.publishedAt}</p
          </div>
        </div>
      </div>
      `
    })
  } catch (error) {
    console.log("error ==>", error);
  }
}

getNews();

const searchBtn = document.getElementById("searchBtn");

const searchInp = document.getElementById("searchInp");

searchInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getSerachedNews(searchInp.value)
    searchInp.value = ""
  }
})

searchBtn.addEventListener("click", () => {
  getSerachedNews(searchInp.value)
})
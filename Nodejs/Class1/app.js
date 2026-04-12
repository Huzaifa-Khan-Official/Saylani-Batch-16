// // console.log("Hello world!");

// const fs = require("fs")

// const text = fs.readFileSync("./text.txt", 'utf-8')

// console.log("text ==>", text);

// // fs.writeFileSync("./text.txt", "Abb rehman chup hochuka hai")

// fs.appendFileSync("./text.txt", "\nRehman soo raha hai")

// const text1 = fs.readFileSync("./text.txt", 'utf-8')


// console.log("text1 ==>", text1);

// fs.rmdirSync("./testDir")


const http = require("http")

const server = http.createServer((req, res) => {
  console.log("req ==>", req.url);
  if (req.url === "/") {
    res.end("You are welcome to our server!")
  } else if (req.url.startsWith("/products")) {
    res.end("{'Product': [{id: 1, title: 'product 1'}, {id: 2, title: 'product 2'}]}")
  } else if (req.url.startsWith("/todos")) {
    res.end("{'todos': [{id: 1, title: 'todo 1'}, {id: 2, title: 'todo 2'}]}")
  } else {
    res.end("This item is not available!")
  }
})

server.listen(4000, "127.0.0.1", () => {
  console.log("Server is up and running on PORT: 4000");
})
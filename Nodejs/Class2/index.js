// // const http = require("http")

// import http from "http"
// // const name = require("./about.js")
// import name from "./about.js"
// console.log("Hello world!", name);


// import http from "http"

// const server  = http.createServer((req, res) => {
//   res.end("What would you like to purchase? (Shirt, jeans, shoes, watches, etc.)")
// })

// server.listen(5000, "127.0.0.1", () => {
//   console.log("server is up and running on PORT: ", 5000);
// })

import express from "express"

const app = express()
const PORT = 4000

app.get("/", (req, res) => {
  console.log("/ route has been called");
  res.send("What would you like to purchase? (Shirt, jeans, shoes, watches, etc.)")
})

app.get("/products", (req, res) => {
  console.log("/products route has been called");
  res.send("Products list")
})

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
})
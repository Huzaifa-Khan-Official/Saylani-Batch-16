import express from "express"
import cors from "cors"

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

// app.get("/", (req, res) => {
//   res.send("You have request the root endpoint")
// })

// app.get("/products", (req, res) => {
//   res
//   .status(200)
//   .json({
//     status: true,
//     message: "Products fetched successfully!",
//     data: [
//       {
//         name: "Product 1",
//         price: "$200"
//       },
//       {
//         name: "Product 2",
//         price: "$200"
//       }
//     ]
//   })
// })

// app.post("/users", (req, res) => {
//   res.json({
//     status: true,
//     message: "User created successfully!",
//     data: null
//   })
// })


// CRUD of USER
let users = []

app.get("/users", (req, res) => {
  res
    .status(200)
    .json({
      status: true,
      message: "Users fetched successfully!",
      data: users
    })
})

app.post("/users", (req, res) => {
  console.log("req.body ==>", req.body);
  users.push(req.body)
  
  res
    .status(200)
    .json({
      status: true,
      message: "User created successfully!",
      data: null
    })
})

app.delete("/users", (req, res) => {
  users = []
  res
    .status(200)
    .json({
      status: true,
      message: "Users deleted successfully!",
      data: null
    })
})

// ---- Todos Endpoint -----
let todos = []

app.get("/todos", (req, res)  => {
  res.json({
    status: true,
    message: "Todos fetched successfully!",
    data: todos
  })
})

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
})
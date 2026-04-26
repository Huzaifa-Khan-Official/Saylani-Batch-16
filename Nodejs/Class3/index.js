import express from "express"
import cors from "cors"
import morgan from "morgan"
import 'dotenv/config'

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString()
//   console.log("Running fist middleware ==>");
//   next()
// })

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
// let users = []

// app.use((req, res, next) => {
//   console.log("Running second middleware   ==>");
//   // if (req.body.username == "User1") {
//   //   next()
//   // }
//   // res.json({
//   //   status: false,
//   //   message: "Invalid username"
//   // })
//   next()
// })

// app.get("/users", (req, res) => {
//   console.log("Req.requestTime ==>", req.requestTime);
//   res
//     .status(200)
//     .json({
//       status: true,
//       message: "Users fetched successfully!",
//       data: users
//     })
// })

// app.post("/users", (req, res) => {
//   console.log("req.body ==>", req.body);
//   users.push(req.body)

//   res
//     .status(200)
//     .json({
//       status: true,
//       message: "User created successfully!",
//       data: null
//     })
// })

// app.delete("/users", (req, res) => {
//   users = []
//   res
//     .status(200)
//     .json({
//       status: true,
//       message: "Users deleted successfully!",
//       data: null
//     })
// })

// ---- Todos Endpoint -----
let todos = []

// Get all todos
app.get("/todos", (req, res) => {
  res
    .status(200)
    .json({
      status: true,
      message: "Todos fetched successfully!",
      data: todos
    })
})

// Create a todo
app.post("/todos", (req, res) => {
  console.log("req.body ==>", req.body);
  if (!req.body) {
    res.status(400).json({
      status: false,
      message: "Please fill all required fields!",
      data: null
    })
  }

  todos.push(req.body)

  res.status(200).json({
    status: true,
    message: "Todo created successfully!",
    data: null
  })
})

// Delete all todos
app.delete("/todos", (req, res) => {
  todos = []
  res.status(200).json({
    status: true,
    message: "All todos deleted successfully!",
    data: null
  })
})

// Get todo by title
app.get("/todos/:title", (req, res) => {
  console.log("req.params ==>", req.params.title);
  const title = req.params.title

  res.status(200).json({
    status: true,
    message: "Todo fetched successfully!",
    data: todos.find((todo) => todo.title === title)
  })
})

// Update todo by title
app.put("/todos/:title", (req, res) => {

  todos.forEach((todo) => {
    if (todo.title === req.params.title) {
      todo.description = req.body.description
    }
  })

  res.status(200).json({
    status: true,
    message: "Todo updated successfully!",
    data: null
  })
})

app.listen(port, () => {
  console.log("admin email ==>", process.env.ADMIN_EMAIL);
  console.log(`Server is up and running on PORT: ${port}`);
})
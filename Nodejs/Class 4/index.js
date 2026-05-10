const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { config } = require("dotenv")
const configs = require("./configs/configs")
const connectDB = require("./configs/dbConnect")
const Users = require("./models/userModel")

const app = express()
const port = process.env.PORT

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/users", (req, res, next) => {
  console.log("running first middlware");
  next()
})

app.use("/users", (req, res, next) => {
  console.log("running second middlware");
  next()
})

// Middlware for all endpoint
app.use((req, res, next) => {
  req.role = "admin"
  console.log("running first middlware");
  next()
})

app.use((req, res, next) => {
  if (req.role === "admin") {
    console.log("running second middlware");
    next()
  } else {
    res.send("Not Authorized")
  }
})

// Hard coded Products
const products = [
  {
    name: 'Product 1',
    price: 12
  },
  {
    name: 'Product 2',
    price: 1200
  },
  {
    name: 'Product 3',
    price: 5000
  }
]

// Root directory Endpoint
app.get("/", (req, res) => {
  res.send("You are listing to the / directory. what would you like to buy?")
})

// All Products Endpoint
app.get("/products", (req, res) => {
  res
    .status(200)
    .json({
      message: "Products fetched successfully!",
      data: products
    })
})

// Create Product Endpoint
app.post("/products", (req, res) => {
  const { productName, productPrice } = req.body;
  products.push({
    name: productName,
    price: productPrice
  })

  res.json({
    message: "Your product has been added",
    data: null
  })
})

// Get Single Product By Product Price
app.get("/products/:price", (req, res) => {
  console.log("req.params ==>", req.params.price);

  const product = products.find((product) => {
    if (req.params.price == product.price) return product
  })

  if (product) {
    res.status(200).json({
      message: "Single Product Fetched Successfully!",
      data: product
    })
  } else {
    res.status(400).json({
      message: "Product Not Found!",
      data: null
    })
  }
})

// All Users Endpoint
app.get("/users", (req, res) => {
  res
    .status(200)
    .json({
      message: "users fetched successfully!",
      data: null
    })
})

// Create user Endpoint
app.post("/users", (req, res) => {
  const { productName, productPrice } = req.body;
  // products.push({
  //   name: productName,
  //   price: productPrice
  // })

  const newUser = new Users({
    fullName: productName
  })

  newUser.save()
  .then(() => console.log("user cerated successfully!", newUser))
  .catch((error) => console.log("Error ==>", error))

  res.json({
    message: "Your product has been added",
    data: null
  })
})

// Get Single Product By Product Price
app.get("/products/:price", (req, res) => {
  console.log("req.params ==>", req.params.price);

  const product = products.find((product) => {
    if (req.params.price == product.price) return product
  })

  if (product) {
    res.status(200).json({
      message: "Single Product Fetched Successfully!",
      data: product
    })
  } else {
    res.status(400).json({
      message: "Product Not Found!",
      data: null
    })
  }
})

app.listen(configs.PORT, () => {
  connectDB()
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    console.error("Error connecting to database", err);
    process.exit(1); // Exit the process with an error code
  });
  console.log("Server is up and running on PORT: ", configs.PORT);
})
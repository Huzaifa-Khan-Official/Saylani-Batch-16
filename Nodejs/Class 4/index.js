const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

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
app.get("/", (req, res) => {
  res.send("You are listing to the / directory. what would you like to buy?")
})

app.get("/products", (req, res) => {
  res
    .status(200)
    .json({
      message: "Products fetched successfully!",
      data: products
    })
})

app.post("/products", (req, res) => {
  const {productName, productPrice} = req.body;
  products.push({
    name: productName,
    price:  productPrice
  })
  res.json({
    message: "Your product has been added",
    data: null
  })
})

app.listen(5000, () => {
  console.log("Server is up and running on PORT: ", 5000);
})
import { useEffect, useState } from "react"

const getAllProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/products")
    const data = await res.json()
    return data.data
  } catch (error) {
    console.log("error ==>", error);
  }
}

export default function App() {
  const [products, setProducts] = useState(null);
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")

  useEffect(() => {
    (async () => {
      const data = await getAllProducts()
      setProducts(data)
    })()
  }, [])

  const addProduct = async () => {
    try {
      console.log("productName ==>", productName);
      console.log("productPrice ==>", productPrice);
      const product = {
        productName,
        productPrice
      }
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      console.log("error ==>", error);
    }
  }

  return (
    <div>
      <h1>All Products</h1>
      {
        products && products.map((product) => (
          <>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          </>
        ))
      }

      <h1>Add Product</h1>
      <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Enter product Name" />
      <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="text" placeholder="Enter product price" />
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}
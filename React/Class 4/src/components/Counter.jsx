import { useState } from "react"

function Counter() {
  // let [count, setCount] = useState(0)
  const [arr, setArr] = useState(["a", "b", 'c'])
  const [newValue, setNewValue] = useState("")

  // const updateCounter = (newValue) => {
  // count = count + 1

  // setCount(count + 1)

  // setCount((count) => count + 1)

  // setArr((prevArr) => [...prevArr, newValue])
  // }

  const updateArr = () => {
    setArr((prevArr) => [...prevArr, newValue])
    setNewValue("")
  }

  console.log("newValue ==>", newValue);

  return (
    <div>
      {/* <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={updateCounter}>Update Counter</button> */}

      {
        arr.map((value, index) => (
          <p key={index}>
            {value}
          </p>
        ))
      }

      <input type="text" value={newValue} onChange={(e) => { setNewValue(e.target.value) }} />

      {/* <button onClick={() => updateCounter("d")}>Add to arr</button> */}
      {/* <button onClick={() => updateCounter("d")}>Add to arr</button> */}
      <button onClick={updateArr}>Add to arr</button>
    </div>
  )
}

export default Counter
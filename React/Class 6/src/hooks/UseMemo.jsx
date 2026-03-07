import { memo, useMemo, useReducer, useState } from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // console.log("perform addition");
      return state + 1

    case "SUB":
      // console.log("perform subtraction");
      return state - 1
  }
}

const Calculation = memo(() => {
  const calculate = () => {
    let sum = 0
    for (let i = 0; i < 1000000000; i++) {
      sum = sum + i
      // sum += i      
    }
    return sum
  }
  // const data = calculate()
  const data = useMemo(() => calculate(), [])

  console.log("child component re render");

  return (
    <div>
      Data : {data}
    </div>
  )
})



function UseMemo() {
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <div>UserReducer
      <h1>Count: {count}</h1>
      <div className="flex flex-col items-start">
        {/* <button onClick={() => setCount(count + 1)} className="bg-green-300"> */}
        <button onClick={() => dispatch({ type: "ADD" })} className="bg-green-300">
          Increment
        </button>
        {/* <button onClick={() => setCount(count - 1)} className="bg-red-300"> */}
        <button onClick={() => dispatch({ type: "SUB" })} className="bg-red-300">
          Decrement
        </button>
      </div>
      <Calculation />
    </div>
  )
}

export default UseMemo
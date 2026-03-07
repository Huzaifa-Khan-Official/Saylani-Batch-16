import { useReducer, useState } from "react"
import {ChildMemoComponent} from "./ChildMemoComponent"

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



function MemoComponent() {
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

      {/* <ChildMemoComponent /> traditional componenent call */}

      <ChildMemoComponent />
    </div>
  )
}

export default MemoComponent
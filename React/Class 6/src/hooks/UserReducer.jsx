import { useReducer, useState } from "react"

// reducer function handles the complex state management
// dispatch function calls the reducer function
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

function UserReducer() {
  // const [count, setCount] = useState(0)
  const [count, dispatch] = useReducer(reducer, 0)

  console.log("count ==>", count);

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
    </div>
  )
}

export default UserReducer
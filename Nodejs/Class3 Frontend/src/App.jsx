import { useEffect, useState } from "react"

const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:5000/todos")
    const todos = await response.json()
    console.log("todos ==>", todos);
  } catch (error) {
    console.log("error ==>", error);
  }
}

export default function App() {
  const todos = getTodos();
  return (
    <div>
      <h1>Todo app</h1>
      {
        todos ? (
          <div>
            {/* {
              todos.ma
            } */}
            todos fetched successfully
          </div>
        ) : (
          <div>
            No todos available
          </div>
        )
      }
    </div>
  )
}
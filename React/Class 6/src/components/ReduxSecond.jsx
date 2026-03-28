import React from 'react'
import { useSelector } from 'react-redux'

function ReduxSecond() {
  const count = useSelector((state) => state.counter)
  return (
    <div>
      <h1>ReduxSecond</h1>
      <h2>Count: {count}</h2>
    </div>
  )
}

export default ReduxSecond
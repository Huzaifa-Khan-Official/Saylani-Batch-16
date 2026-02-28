import React, { useState } from 'react'
import { CounterContext } from './counterContext'

function CounterProvider({ children }) {
  const [counter, setCounter] = useState(0)

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  )
}

export default CounterProvider
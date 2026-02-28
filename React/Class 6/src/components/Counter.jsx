import React, { useContext } from 'react'
import { CounterContext } from '../context/counterContext'
import { Link } from 'react-router'
import { UserContext } from '../context/UserContext'

function Counter() {
  const { counter, setCounter } = useContext(CounterContext)
  const [user] = useContext(UserContext);

  const addition = () => {
    setCounter(oldState => oldState + 1)
  }

  const subtraction = () => {
    setCounter(oldState => oldState - 1)
  }

  return (
    <div className='px-5 mt-5 py-5'>Counter
      <h1>{counter}</h1>
      <button onClick={addition} className='border-green-400 border-2 rounded-full px-4 py-2 hover:bg-green-200 hover:cursor-pointer'>+ Add</button> <br />
      <button onClick={subtraction} className='block'>- Sub</button>
      {
        user
      }
      <Link to="/about">About Page</Link>
    </div>
  )
}

export default Counter
import React, { useContext } from 'react'
import { CounterContext } from '../context/counterContext'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router';

function About() {
  const { counter } = useContext(CounterContext);
  const [user, setUser] = useContext(UserContext);
  
  return (
    <div>About
      <h1>
        {counter}
      </h1>
      <h2>
        {
          user
        }
      </h2>

      <button onClick={() => setUser("PAKISTAN")}>
        Update Username
      </button> <br />
      <Link to="/">Home Page</Link>
    </div>
  )
}

export default About
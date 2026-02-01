import { useState } from "react";

export default function Login() {
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("")

  const handleEmailChange = (e) => {
    // console.log("value ==>", e.target.value);
    setEmailVal(e.target.value)
  }

  const handlePasswordChange = (e) => {
    // console.log("value ==>", e.target.value);
    setPassVal(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("emailValue ==>", emailVal);
    console.log("passVal ==>", passVal);


    
    // Reset form
    setEmailVal('')
    setPassVal('')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={emailVal} type="text" onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password</label>
          <input value={passVal} type="text" onChange={handlePasswordChange} />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
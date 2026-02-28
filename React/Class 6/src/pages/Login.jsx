import { Form, Link, useActionData } from "react-router"

function Login() {
  const data = useActionData()

  console.log("data =>", data)

  return (
    <div>Login Page

      <br />
      <Link to="/">Home</Link>

      <Form method="POST" >
        <input type="text" name="username" />
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">
          Login
        </button>
        {
          data?.error && <p>{data.error}</p>
        }
      </Form>

    </div>
  )
}

export default Login
import { redirect } from "react-router";

export async function LoginAction({ request }) {
  const formData = await request.formData();

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("username ==>", username)
  console.log("email ==>", email)
  console.log("password ==>", password)

  if (username == "User1") {
    return redirect("/")
  }

  return { error: "Invalid credentials" }
}
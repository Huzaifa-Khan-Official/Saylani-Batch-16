import { redirect } from "react-router";

const ProtectedRoutes = async () => {
  const isAuthenticated = true;

  console.log("ProtecteRoutes runs")

  if (!isAuthenticated) {
    throw redirect("/login")
  }
}

export default ProtectedRoutes
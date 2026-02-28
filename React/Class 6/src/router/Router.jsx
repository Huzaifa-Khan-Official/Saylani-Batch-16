import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import DashboardLayout from "../pages/DashboardLayout";
import About from "../pages/About";
import AuthLayout from "../pages/AuthLayout";
import ProtectedRoutes from "../loaders/ProtectedRoutes";
import { LoginAction } from "../actions/LoginAction";
// import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    loader: ProtectedRoutes,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/about",
        Component: About
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          {
            index: true,
            // Component: Login,
            element: <Login />
          },
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    action: LoginAction
  }
])

function Router() {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
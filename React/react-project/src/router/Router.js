import { createBrowserRouter } from "react-router";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home";
import Interface from "../Pages/Interface";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "interface",
        Component: Interface
      },
    ]
  },
]);

export default router
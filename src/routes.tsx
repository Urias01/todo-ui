import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app-layout";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "", element: <Home /> }]
  }
]);

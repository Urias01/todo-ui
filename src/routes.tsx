import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app-layout";
import { Home } from "./pages/home";
import { PublicRoute } from "./features/auth/components/public-route";
import { ProtectedRoute } from "./features/auth/components/protected-route";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { AuthForm } from "./pages/auth/components/forms/auth-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <Home /> }]
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [{ path: "/sign-in", element: <AuthForm /> }]
  }
]);

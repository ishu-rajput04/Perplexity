import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Proctected from "../features/auth/components/Proctected"
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Proctected>
        <main>Dashboard</main>
      </Proctected>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);

import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Proctected from "../features/auth/components/Proctected";
import Dashboard from "../features/chat/pages/Dashboard";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Proctected>
        <Dashboard />
      </Proctected>
    ),
  },
  { path: "/dashboard", element: <Navigate to={"/"} replace /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);

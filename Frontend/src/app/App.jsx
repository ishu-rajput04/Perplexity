import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";
import "./index.css";
import { useAuth } from "../features/auth/hooks/useAuth.js";
import { useEffect } from "react";

const App = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.handleGetme();
  }, []);
  
  return <RouterProvider router={router} />;
};

export default App;

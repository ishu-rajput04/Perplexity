import React, { useEffect } from "react";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const chat = useChat();
  
  useEffect(() => {
    chat.initializeSocketConnection()
  }, []);

  return <div className="text-4xl text-blue-500 p-5">DashBoard</div>;
};

export default Dashboard;

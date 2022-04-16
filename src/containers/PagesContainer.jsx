import React from "react";
import { useLocation } from "react-router-dom";

const PagesContainer = () => {
  const location = useLocation();
  // if (location.pathname === "/dashboard") return <Dashboard />;
  // if (location.pathname === "/user-panel") return <Profile />;
  return <div>ss</div>;
};

export default PagesContainer;

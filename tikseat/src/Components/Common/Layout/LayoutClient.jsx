import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const LayoutClient = () => {
  return (
    <div style={{ position: "relative" }}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default LayoutClient;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Auth";

const AppMain: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>loggedin</h1>} />
          <Route path="/:locationId" element={<h1>locationId</h1>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default AppMain;

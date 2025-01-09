import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("Hatsha")

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={ isAuthenticated ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/" element={ isAuthenticated ? <Home /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;

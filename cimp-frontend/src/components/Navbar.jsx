// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow flex justify-between items-center px-6 py-3 mb-6">
      <h1 className="text-xl font-bold">CIMP</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 text-sm">
          Logged in as: <strong>{user?.name}</strong> ({user?.role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

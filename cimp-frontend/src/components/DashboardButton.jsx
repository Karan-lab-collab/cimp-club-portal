// src/components/DashboardButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardButton({ label, path, color }) {
  const navigate = useNavigate();

  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    gray: "bg-gray-800 hover:bg-gray-900",
  };

  return (
    <button
      onClick={() => navigate(path)}
      className={`${colorMap[color]} text-white p-4 rounded-xl shadow transition duration-200 text-lg font-semibold`}
    >
      {label}
    </button>
  );
}

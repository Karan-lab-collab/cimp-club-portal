// src/main.jsx
import "./styles.css"; 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateClub from "./pages/CreateClub.jsx";
import ManageMembers from "./pages/ManageMembers.jsx";
import AssignRoles from "./pages/AssignRoles.jsx";
import ViewClubs from "./pages/ViewClubs.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ⬅️ import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-club"
          element={
            <ProtectedRoute>
              <CreateClub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-members"
          element={
            <ProtectedRoute>
              <ManageMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign-roles"
          element={
            <ProtectedRoute>
              <AssignRoles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-clubs"
          element={
            <ProtectedRoute>
              <ViewClubs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

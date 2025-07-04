import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css"; // Make sure this is the correct relative path

export default function Login() {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://cimp-club-portal.onrender.com/api/login", {
        role,
        username,
        password,
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or not assigned role");
    }
  };
  useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/ping`).catch(() => {});
}, []);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">CIMP Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="president">President</option>
            <option value="faculty">Faculty</option>
          </select>

          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name or ID"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

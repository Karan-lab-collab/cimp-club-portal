import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const goTo = (path) => navigate(path);

  return (
    <div className="dashboard-wrapper">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="dashboard-content">
        <h1>CIMP Dashboard</h1>
        <p className="logged-in">Logged in as: <strong>{user.name}</strong> ({user.role})</p>

        <div className="dashboard-buttons">
          {/* Admin Buttons */}
          {user.role === "admin" && (
            <>
              <button onClick={() => goTo("/create-club")}>Create Club</button>
              <button onClick={() => goTo("/assign-roles")}>Assign Roles</button>
              <button onClick={() => goTo("/manage-members")}>Manage Members</button>
              <button onClick={() => goTo("/view-clubs")}>View All Clubs</button>
            </>
          )}

          {/* President Buttons */}
          {user.role === "president" && (
            <>
              <button onClick={() => goTo("/view-clubs")}>View My Club</button>
              <button onClick={() => goTo("/manage-members")}>Manage Members</button>
            </>
          )}

          {/* Faculty Buttons */}
          {user.role === "faculty" && (
            <button onClick={() => goTo("/view-clubs")}>View My Club</button>
          )}
        </div>
      </div>
    </div>
  );
}

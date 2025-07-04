import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewClubs() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClubs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clubs");
      let allClubs = res.data;

      if (user.role === "president") {
        allClubs = allClubs.filter((club) => club.president === user.reg);
      } else if (user.role === "faculty") {
        allClubs = allClubs.filter((club) => club.faculty === user.id);
      }

      setClubs(allClubs);
    } catch {
      alert("Failed to load clubs");
    }
  };

  useEffect(() => {
    if (!user) navigate("/");
    else fetchClubs();
  }, []);

  const deleteClub = async (clubName) => {
    if (!window.confirm(`Are you sure you want to delete "${clubName}"?`)) return;
    try {
      await axios.delete(`http://localhost:3000/api/clubs/${encodeURIComponent(clubName)}`);
      fetchClubs();
    } catch {
      alert("Failed to delete club");
    }
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-wrapper">
      <div className="view-container">
        <h2 className="view-title">View Clubs</h2>

        <input
          type="text"
          placeholder="Search clubs..."
          className="view-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredClubs.length === 0 ? (
          <p className="view-no-clubs">No clubs found.</p>
        ) : (
          <div className="view-list">
            {filteredClubs.map((club) => (
              <div key={club.name} className="view-card">
                <div className="view-info">
                  <h3>{club.name}</h3>
                  <p className="view-category">{club.category}</p>
                  <p>{club.description}</p>
                  <p>
                    <strong>President:</strong> {club.president} |{" "}
                    <strong>Faculty:</strong> {club.faculty}
                  </p>
                  <div className="view-members">
                    <strong>Members:</strong>
                    <ul>
                      {club.members.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {user.role === "admin" && (
                  <button
                    onClick={() => deleteClub(club.name)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

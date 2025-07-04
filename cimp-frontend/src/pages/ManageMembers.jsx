import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles.css';

export default function ManageMembers() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [mode, setMode] = useState("add");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get("https://cimp-club-portal.onrender.com/api/clubs").then((res) => {
      if (user.role === "admin") {
        setClubs(res.data);
      } else if (user.role === "president") {
        setClubs(res.data.filter((club) => club.president === user.reg));
      }
    });

    axios.get("https://cimp-club-portal.onrender.com/api/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  const handleMemberChange = async (reg) => {
    const updatedClubs = clubs.map((club) => {
      if (club.name === selectedClub) {
        if (mode === "add" && !club.members.includes(reg)) {
          club.members.push(reg);
        } else if (mode === "remove") {
          club.members = club.members.filter((r) => r !== reg);
        }
      }
      return club;
    });

    try {
      await axios.put("https://cimp-club-portal.onrender.com/api/clubs", updatedClubs);
      setClubs(updatedClubs);
      setStatus(`✅ Member ${mode === "add" ? "added" : "removed"} successfully.`);
    } catch {
      setStatus("❌ Failed to update members.");
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.reg.toLowerCase().includes(search.toLowerCase())
  );

  const currentClub = clubs.find((c) => c.name === selectedClub);
  const currentMembers = currentClub?.members || [];

  return (
  <div className="manage-members-wrapper">
    <div className="manage-members-container">
      <h2 className="manage-members-title">Manage Club Members</h2>

      {status && <p className="status-message">{status}</p>}

      <div className="form-group">
        <label className="form-label">Select Club</label>
        <select
          className="form-input"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          <option value="">-- Select a club --</option>
          {clubs.map((club) => (
            <option key={club.name} value={club.name}>
              {club.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClub && (
        <>
          <div className="mode-toggle">
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="add"
                checked={mode === "add"}
                onChange={() => setMode("add")}
              />
              Add Members
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="remove"
                checked={mode === "remove"}
                onChange={() => setMode("remove")}
              />
              Remove Members
            </label>
          </div>

          <input
            type="text"
            placeholder="Search student by name or reg no..."
            className="form-input search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="member-list">
            {filteredStudents.map((student) => {
              const isMember = currentMembers.includes(student.reg);
              const shouldShow =
                (mode === "add" && !isMember) ||
                (mode === "remove" && isMember);

              return shouldShow ? (
                <div key={student.reg} className="member-row">
                  <span>
                    {student.name} ({student.reg})
                  </span>
                  <button
                    onClick={() => handleMemberChange(student.reg)}
                    className={`member-action-btn ${mode === "add" ? "add-btn" : "remove-btn"}`}
                  >
                    {mode === "add" ? "Add" : "Remove"}
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </>
      )}
    </div>
  </div>
);

}

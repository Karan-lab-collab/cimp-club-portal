import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateClub() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [president, setPresident] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [members, setMembers] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    axios.get("http://cimp-club-portal.onrender.com/api/students").then(res => setStudents(res.data));
    axios.get("http://cimp-club-portal.onrender.com/api/faculty").then(res => setFaculty(res.data));
  }, []);

  const handleMemberToggle = (reg) => {
    setMembers(prev =>
      prev.includes(reg)
        ? prev.filter(r => r !== reg)
        : [...prev, reg]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clubName || !description || !category || !president || !coordinator) {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post("http://cimp-club-portal.onrender.com/api/clubs", {
        name: clubName,
        description,
        category,
        president,
        faculty: coordinator,
        members,
        pendingRequests: []
      });

      setSuccess("✅ Club created successfully!");
      setClubName("");
      setDescription("");
      setCategory("");
      setPresident("");
      setCoordinator("");
      setMembers([]);
    } catch (err) {
      console.error("Failed to create club:", err);
      alert("Failed to create club.");
    }
  };

  return (
    <div className="create-club-wrapper">
      <div className="create-club-container">
        <h2 className="title">Create a New Club</h2>
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Club Name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />

          <textarea
            placeholder="Club Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category (e.g., Technical, Cultural)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label>President:</label>
          <select value={president} onChange={(e) => setPresident(e.target.value)}>
            <option value="">-- Select President --</option>
            {students.map((s) => (
              <option key={s.reg} value={s.reg}>
                {s.name} ({s.reg})
              </option>
            ))}
          </select>

          <label>Faculty Coordinator:</label>
          <select value={coordinator} onChange={(e) => setCoordinator(e.target.value)}>
            <option value="">-- Select Faculty --</option>
            {faculty.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.id})
              </option>
            ))}
          </select>

          <label>Add Members:</label>
          <div className="member-list">
            {students.map((s) => (
              <label key={s.reg}>
                <input
                  type="checkbox"
                  checked={members.includes(s.reg)}
                  onChange={() => handleMemberToggle(s.reg)}
                />
                <span>{s.name} ({s.reg})</span>
              </label>
            ))}
          </div>

          <button type="submit">Create Club</button>
        </form>
      </div>
    </div>
  );
}

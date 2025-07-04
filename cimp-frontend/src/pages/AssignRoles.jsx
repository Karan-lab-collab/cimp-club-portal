// src/pages/AssignRoles.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";



export default function AssignRoles() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [selectedClub, setSelectedClub] = useState("");
  const [president, setPresident] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [status, setStatus] = useState("");

  const loadData = async () => {
    const [clubRes, studentRes, facultyRes] = await Promise.all([
      axios.get("https://cimp-club-portal.onrender.com/api/clubs"),
      axios.get("https://cimp-club-portal.onrender.com/api/students"),
      axios.get("https://cimp-club-portal.onrender.com/api/faculty"),
    ]);

    setClubs(clubRes.data);
    setStudents(studentRes.data);
    setFaculty(facultyRes.data);
  };

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    loadData();
  }, []);

  const handleClubSelect = (clubName) => {
    setSelectedClub(clubName);
    const club = clubs.find((c) => c.name === clubName);
    if (club) {
      setPresident(club.president || "");
      setCoordinator(club.faculty || "");
    }
  };

  const handleSave = async () => {
    const updatedClubs = clubs.map((club) =>
      club.name === selectedClub
        ? { ...club, president, faculty: coordinator }
        : club
    );

    try {
      await axios.put("https://cimp-club-portal.onrender.com/api/clubs", updatedClubs);
      setClubs(updatedClubs);
      setStatus("✅ Roles updated successfully!");
    } catch {
      setStatus("❌ Failed to update roles.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assign Roles</h2>

      {status && <p className="mb-4 text-green-600">{status}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Club</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedClub}
          onChange={(e) => handleClubSelect(e.target.value)}
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
          <div className="mb-4">
            <label className="block font-medium mb-1">Assign President</label>
            <select
              className="w-full p-2 border rounded"
              value={president}
              onChange={(e) => setPresident(e.target.value)}
            >
              <option value="">-- Select student --</option>
              {students.map((s) => (
                <option key={s.reg} value={s.reg}>
                  {s.name} ({s.reg})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">
              Assign Faculty Coordinator
            </label>
            <select
              className="w-full p-2 border rounded"
              value={coordinator}
              onChange={(e) => setCoordinator(e.target.value)}
            >
              <option value="">-- Select faculty --</option>
              {faculty.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.id})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Roles
          </button>
        </>
      )}
    </div>
  );
}

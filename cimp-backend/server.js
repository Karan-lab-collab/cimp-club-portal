const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "data.json";

// Load data from file
function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Save data to file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  const { role, username, password } = req.body;
  const data = loadData();
  let user = null;

  if (role === "admin" && username === "admin" && password === "admin123") {
    return res.json({ role: "admin", name: "Admin" });
  }

  if (role === "president") {
    const student = data.students.find(s =>
      (s.reg.toLowerCase() === username.toLowerCase() ||
       s.name.toLowerCase() === username.toLowerCase()) &&
      s.password === password
    );
    const isPresident = data.clubs.some(club => club.president === student?.reg);
    if (student && isPresident) {
      return res.json({ role: "president", ...student });
    }
  }

  if (role === "faculty") {
    const faculty = data.faculty.find(f =>
      (f.id.toLowerCase() === username.toLowerCase() ||
       f.name.toLowerCase() === username.toLowerCase()) &&
      f.password === password
    );
    const isCoordinator = data.clubs.some(club => club.faculty === faculty?.id);
    if (faculty && isCoordinator) {
      return res.json({ role: "faculty", ...faculty });
    }
  }

  res.status(401).json({ error: "Invalid credentials or not assigned role" });
});

// GET Students
app.get("/api/students", (req, res) => {
  const data = loadData();
  res.json(data.students);
});

// GET Faculty
app.get("/api/faculty", (req, res) => {
  const data = loadData();
  res.json(data.faculty);
});

// GET Clubs
app.get("/api/clubs", (req, res) => {
  const data = loadData();
  res.json(data.clubs);
});

// CREATE CLUB
app.post("/api/clubs", (req, res) => {
  const data = loadData();
  data.clubs.push(req.body);
  saveData(data);
  res.json({ success: true });
});

// Delete a club by its name
app.delete("/api/clubs/:name", (req, res) => {
  const data = loadData();
  const clubName = req.params.name.toLowerCase();

  const originalLength = data.clubs.length;
  data.clubs = data.clubs.filter(
    (club) => club.name.toLowerCase() !== clubName
  );

  if (data.clubs.length === originalLength) {
    return res.status(404).json({ success: false, message: "Club not found" });
  }

  saveData(data);
  res.json({ success: true, message: "Club deleted" });
});

// Update full list of clubs (used for updating members)
app.put("/api/clubs", (req, res) => {
  const updatedClubs = req.body;
  const data = loadData();
  data.clubs = updatedClubs;
  saveData(data);
  res.json({ success: true });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


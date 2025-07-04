# CIMP – Club Information Management Portal

CIMP is a full-stack web application built for managing student clubs within an institution. It was created as part of a recruitment challenge and supports user roles like **Admin**, **President**, and **Faculty Coordinator**.

## 🌐 Features

- 🔐 Login System (role-based: Admin, President, Faculty)
- 🏗️ Create and manage clubs (Admin only)
- 👥 Assign presidents and faculty coordinators
- 📋 View club details based on role
- ➕ Add and manage members
- 🗑️ Delete clubs (Admin only)
- 📦 Local JSON storage used to simulate a database

---

## 🛠 Tech Stack

| Layer     | Technology           |
|-----------|----------------------|
| Frontend  | React, Tailwind CSS  |
| Backend   | Node.js, Express.js  |
| Database  | JSON file-based mock DB |
| Tools     | Axios, React Router, Git |

---

## 🔗 Project Structure

cimp-project/
├── backend/ # Node.js + Express API
│ ├── routes/
│ ├── data/ # JSON files for students, faculty, clubs
│ └── server.js
├── frontend/ # React frontend
│ ├── src/
│ │ ├── pages/ # Login, Dashboard, ViewClubs, CreateClub etc.
│ │ └── components/
│ └── public/
├── README.md
└── package.json (in each folder)
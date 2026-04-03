# Privacy Graph Backend

A scalable backend system built with Node.js, Express, PostgreSQL, and Drizzle ORM.  
Designed for social + commerce platforms with a privacy-first relationship model.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- TypeScript
- JWT Authentication

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- Role-based system (buyer, creator, seller, admin)
- JWT-based authentication
- Password hashing using bcrypt

### 🔗 Relationship Graph (Privacy-First)
- Send connection request
- Accept request
- Block user
- Stateful relationship system (pending, accepted, blocked, muted)

---

## 📁 Project Structure

src/
├── controllers/
├── routes/
├── middleware/
├── db/
├── types/
└── server.ts


---

## ⚙️ Setup Instructions

### 1. Install dependencies

npm install


### 2. Setup environment variables
Create a `.env` file:


PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key


### 3. Run the server

npm run dev


---

## 📌 API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Relationships
- `POST /api/relationships/request`
- `PATCH /api/relationships/accept/:id`
- `PATCH /api/relationships/block/:id`
- `GET /api/relationships`

---
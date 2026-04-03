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



Day 2: Core Structural Schemas

## 🔹 Polymorphic Interaction System

### Goal
Avoid creating separate tables for each entity type (post, reel, product, etc.)

###  Implementation
Created unified tables:
- likes
- comments
- shares

###  Key Fields
- entity_id
- entity_type (post, reel, product, live_session)

###  Benefit
- Scalable design
- Reduced duplication
- Supports multiple entity types

---

## 🔹 Multi-Vendor Order Architecture

### Goal
Handle a single checkout with multiple sellers

### Structure

Parent Order → Sub Orders → Order Items

###  Tables

#### Parent Orders
- Stores full checkout details
- Linked to buyer

#### Sub Orders
- Created per seller
- Linked to parent order

#### Order Items
- Individual products
- Linked to sub orders

### Benefit
- Multi-seller checkout support
- Separate seller fulfillment
- Scalable e-commerce design

---

## 🔹 Audit Logs (Immutable Ledger)

###  Goal
Track all system changes (orders, payments, etc.)

### Rule
Append-only (no update/delete)

### Fields
- transaction_id
- entity_type (order, refund, payout)
- entity_id
- old_state
- new_state
- amount
- timestamp

### Benefit
- Full history tracking
- Debugging support
- Financial transparency

---

## Seeder

Seeder implemented to demonstrate:
- 1 Parent Order
- Multiple Sub Orders
- Order Items

Run:
```bash
npm run seed
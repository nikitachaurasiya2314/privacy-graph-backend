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
- Passwordless OTP login (email-based)

### 🔗 Relationship Graph (Privacy-First)
- Send connection request
- Accept request
- Block user
- Stateful relationship system (pending, accepted, blocked, muted)

---

## 📁 Project Structure

```
src/
├── controllers/
├── routes/
├── middleware/
├── services/
├── db/
├── utils/
├── types/
└── server.ts
```

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 3. Run the server

```bash
npm run dev
```

---

## 📌 API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`

### Relationships
- `POST /api/relationships/request`
- `PATCH /api/relationships/accept/:id`
- `PATCH /api/relationships/block/:id`
- `GET /api/relationships`

---

## 📅 Day 2: Core Structural Schemas

### 🔹 Polymorphic Interaction System

**Goal:** Avoid creating separate tables for each entity type (post, reel, product, etc.)

**Implementation:** Created unified tables:
- `likes`
- `comments`
- `shares`

**Key Fields:**
- `entity_id`
- `entity_type` (post, reel, product, live_session)

**Benefit:** Scalable design, reduced duplication, supports multiple entity types.

---

### 🔹 Multi-Vendor Order Architecture

**Goal:** Handle a single checkout with multiple sellers.

**Structure:**

```
Parent Order → Sub Orders → Order Items
```

**Tables:**

**Parent Orders**
- Stores full checkout details
- Linked to buyer

**Sub Orders**
- Created per seller
- Linked to parent order

**Order Items**
- Individual products
- Linked to sub orders

**Benefit:** Multi-seller checkout support, separate seller fulfillment, scalable e-commerce design.

---

### 🔹 Audit Logs (Immutable Ledger)

**Goal:** Track all system changes (orders, payments, etc.)

**Rule:** Append-only (no update/delete)

**Fields:**
- `transaction_id`
- `entity_type` (order, refund, payout)
- `entity_id`
- `old_state`
- `new_state`
- `amount`
- `timestamp`

**Benefit:** Full history tracking, debugging support, financial transparency.

---

### Seeder

Seeder implemented to demonstrate:
- 1 Parent Order
- Multiple Sub Orders
- Order Items

```bash
npm run seed
```

---

## Authentication Enhancements (OTP-Based Login)

### 🔹 Passwordless Authentication (OTP Login)

**Goal:** Enable users to login without a password using One-Time Password (OTP) for better UX and modern authentication support.

---

### ⚙️ Flow

```
User enters email
        ↓
OTP is generated & stored (hashed)
        ↓
OTP sent to user (currently via console)
        ↓
User submits OTP
        ↓
OTP verified → deleted from DB
        ↓
JWT token issued ✅
```

---

### 🗃️ Tables Added

**`otps`** — stores OTP records temporarily, linked with user email

| Column | Type | Description |
|---|---|---|
| `email` | text | User's email address |
| `otp` | text | SHA-256 hashed OTP |
| `expires_at` | timestamp | 5 minutes from creation |
| `created_at` | timestamp | Auto-set on insert |

---

### 🔐 Security Features

- OTP is hashed using **SHA-256** before storage
- OTP expires in **5 minutes**
- Only the **latest OTP** is valid (previous ones are deleted on new request)
- OTP is **deleted immediately** after successful verification
- **60-second cooldown** between OTP requests (rate limited)
- Prevents **replay attacks** and **brute force** attempts

---

### 🚀 APIs

#### ➤ Send OTP

```
POST /api/auth/send-otp
```

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "OTP sent"
}
```

---

#### ➤ Verify OTP (Login)

```
POST /api/auth/verify-otp
```

Request:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### 🧠 Architecture

```
controllers/
  auth.controller.ts     ← sendOtp, verifyOtp handlers

services/
  auth.service.ts        ← findOrCreateUser
  otp.service.ts         ← sendOtpService, verifyOtpService

utils/
  jwt.ts                 ← generateToken
  otp.ts                 ← generateOtp, hashOtp
```

---

### ⚠️ Notes

- OTP is currently **logged to console** (development mode)
- Can be integrated with:
  - **Nodemailer** (email)
  - **Twilio** (SMS)
  - **SendGrid / AWS SES** (production email)

---

### 📈 Benefits

- Passwordless login improves UX
- Reduces dependency on password storage
- Prepares system for OAuth (Google, GitHub, etc.)
- Scalable authentication design
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



---

## 🏪 Seller Onboarding & Verification (GST + PAN)

### 🔹 Overview

This module enables **seller registration with business verification**, ensuring compliance with Indian e-commerce regulations.

It includes:

* GST Verification (mock + API-ready)
* PAN Verification (mock + API-ready)
* Seller Profile creation
* OTP-based verification flow

---

### ⚙️ Seller Registration Flow

```
User fills seller form
        ↓
PAN verification
        ↓
GST verification
        ↓
Seller profile created
        ↓
OTP generated and logged in console (development mode)        ↓
OTP verified → account activated ✅
```

---

### 🧾 GST Verification

**Purpose:** Validate GSTIN and auto-fetch business details

#### Features:

* GST format validation (15 characters)
* Mock verification (for development)
* API-ready structure (Masters India / ClearTax)

#### Mock Test GST:

```
22ABCDE1234F1Z5 → valid
```

#### API:

```
POST /api/gst/verify-gst
```

Request:

```json
{
  "gstin": "22ABCDE1234F1Z5"
}
```

Response:

```json
{
  "valid": true,
  "businessName": "ABC Traders Pvt Ltd"
}
```

---

### 🪪 PAN Verification

**Purpose:** Verify seller identity and link with GST

#### Features:

* PAN format validation (ABCDE1234F)
* Mock verification
* Cross-validation ready (PAN ↔ GST)

#### Mock Test PAN:

```
ABCDE1234F → valid
```

#### API:

```
POST /api/pan/verify-pan
```

Request:

```json
{
  "pan": "ABCDE1234F"
}
```

Response:

```json
{
  "valid": true,
  "name": "ABC Traders Pvt Ltd"
}
```

---

### 🏪 Seller Profile

**Table:** `seller_profiles`

#### Fields:

| Column      | Type    | Description               |
| ----------- | ------- | ------------------------- |
| `id`        | UUID    | Primary key               |
| `user_id`   | UUID    | Linked to users (1:1)     |
| `shop_name` | text    | Store name                |
| `phone`     | text    | Contact number            |
| `address`   | text    | Shop location             |
| `has_gst`   | boolean | GST availability          |
| `gstin`     | text    | GST number (optional)     |
| `eid`       | text    | Enrollment ID (if no GST) |
| `pan`       | text    | Seller PAN (optional now) |

---

### 🔌 Seller APIs

#### ➤ Register Seller

```
POST /api/auth/register-seller
```

Request:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "123456",

  "shopName": "John Store",
  "phone": "9876543210",
  "address": "Indore, India",

  "hasGst": true,
  "gstin": "22ABCDE1234F1Z5",
  "eid": null,
  "pan": "ABCDE1234F"
}
```

Response:

```json
{
  "message": "Seller registered. OTP sent.",
  "email": "john@example.com"
}
```

---

### 🔐 Security Notes

* PAN & sensitive data should be **encrypted (AES-256)** in production
* GST & PAN APIs should be called from **backend only**
* Never expose API credentials on frontend
* OTP verification required before login

---


---

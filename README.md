# 🔋 Battery Chemistry Management API

A RESTful API built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** to manage battery chemistries and their vehicle-specific configurations.

---

## 📦 Tech Stack & Modules

| Module | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | HTTP server & routing framework |
| `@prisma/client` | ^6.19.3 | Type-safe database ORM client |
| `prisma` | ^6.19.3 | Database schema management & migrations |
| `typescript` | ^6.0.3 | Static type checking |
| `ts-node-dev` | ^2.0.0 | Development server with hot-reload |
| `dotenv` | ^17.4.2 | Environment variable loader |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing middleware |
| `helmet` | ^8.2.0 | HTTP security headers |
| `morgan` | ^1.10.1 | HTTP request logger |
| `bcrypt` | ^6.0.0 | Password hashing utility |
| `jsonwebtoken` | ^9.0.3 | JWT authentication tokens |
| `zod` | ^4.4.3 | Schema validation |

---

## 📁 Project Structure

```
battery-chemistry-management/
├── prisma/
│   ├── schema.prisma           # Database models
│   └── migrations/             # Migration history
├── src/
│   ├── config/
│   │   └── prisma.ts           # Prisma client singleton
│   ├── controllers/
│   │   └── battery.controller.ts  # HTTP request handlers
│   ├── middleware/
│   │   └── errorHandler.ts     # Global error handling middleware
│   ├── repositories/
│   │   └── battery.repository.ts  # Database query layer
│   ├── routes/
│   │   └── battery.routes.ts   # API route definitions
│   ├── services/
│   │   └── battery.service.ts  # Business logic layer
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Entry point
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → https://nodejs.org
- **npm** v9 or higher (comes with Node.js)

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env` file is already present with the local Prisma Postgres connection string. It looks like:

```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=<your-api-key>"
```

> **Note:** Do not change this URL if you are using the local Prisma Dev database.

### 3. Start the Local Database

The project uses **Prisma Dev** — a local embedded PostgreSQL instance. You must start it before running the server.

```bash
npx prisma dev
```

This will start the database and keep it running in the foreground. You should see:

```
✔  Your local Prisma Postgres server default is now running 👍
```

> **Tip:** To run it in the background (detached), use:
> ```bash
> npx prisma dev -d
> ```

### 4. Push Database Schema

On first run (or after schema changes), push the Prisma schema to the database:

```bash
npx prisma db push
```

You should see:

```
Your database is now in sync with your Prisma schema.
```

### 5. Start the Development Server

In a **new terminal window** (keep the database terminal running), start the API server:

```bash
npm run dev
```

You should see:

```
Server running on 5000
```

The API is now available at: **`http://localhost:5000`**

---

## 🔁 Full Startup Sequence (Quick Reference)

```bash
# Terminal 1 — Start the database
npx prisma dev

# Terminal 2 — Push schema (first time only)
npx prisma db push

# Terminal 2 — Start the API server
npm run dev
```

---

## 🌐 API Reference

Base URL: `http://localhost:5000/api/v1`

---

### 🩺 Health Check

#### `GET /api/v1/health`

Returns server health status.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is healthy 🚀",
  "timestamp": "2026-05-26T08:53:00.000Z"
}
```

---

### ⚡ Battery Chemistries

#### `GET /api/v1/chemistries`

Fetch all battery chemistries, ordered by creation date (newest first).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "chemistryName": "LFP",
      "nominalVoltage": 3.2,
      "maxVoltage": 3.65,
      "minVoltage": 2.5,
      "energyDensity": 160,
      "cycleLife": 3000,
      "safetyLevel": "High",
      "createdAt": "2026-05-26T08:00:00.000Z",
      "updatedAt": "2026-05-26T08:00:00.000Z"
    }
  ]
}
```

---

#### `GET /api/v1/chemistries/:id`

Fetch a single battery chemistry by ID.

**Response `200`:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Response `404`:**
```json
{
  "success": false,
  "error": "Battery chemistry not found"
}
```

---

#### `POST /api/v1/chemistries`

Create a new battery chemistry.

**Request Body:**
```json
{
  "chemistryName": "NMC",
  "nominalVoltage": 3.7,
  "maxVoltage": 4.2,
  "minVoltage": 3.0,
  "energyDensity": 250,
  "cycleLife": 1500,
  "safetyLevel": "Medium"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": { "id": "uuid", ... }
}
```

---

#### `PUT /api/v1/chemistries/:id`

Update an existing battery chemistry.

**Request Body:** *(any subset of chemistry fields)*
```json
{
  "cycleLife": 2000,
  "safetyLevel": "High"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

#### `DELETE /api/v1/chemistries/:id`

Delete a battery chemistry by ID.

**Response `200`:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### ⚙️ Chemistry Configurations

#### `GET /api/v1/configs`

Fetch all chemistry configurations. Supports optional query filters:

| Query Param | Type | Description |
|---|---|---|
| `chemistryId` | `string` | Filter by chemistry ID |
| `vehicleModel` | `string` | Filter by vehicle model (case-insensitive) |
| `isActive` | `boolean` | Filter by active status (`true`/`false`) |

**Example:** `GET /api/v1/configs?isActive=true&vehicleModel=Model3`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "vehicleModel": "Model3",
      "chargeCutoffVoltage": 4.15,
      "dischargeCutoffVoltage": 3.0,
      "temperatureLimit": 45.0,
      "firmwareVersion": "v2.1.0",
      "isActive": true,
      "chemistryId": "uuid",
      "chemistry": { ... }
    }
  ]
}
```

---

#### `GET /api/v1/configs/:id`

Fetch a single configuration by ID (includes parent chemistry).

---

#### `POST /api/v1/configs`

Create a new chemistry configuration for a vehicle.

**Request Body:**
```json
{
  "vehicleModel": "Model3",
  "chargeCutoffVoltage": 4.15,
  "dischargeCutoffVoltage": 3.0,
  "temperatureLimit": 45.0,
  "firmwareVersion": "v2.1.0",
  "isActive": true,
  "chemistryId": "<existing-chemistry-uuid>"
}
```

---

#### `PUT /api/v1/configs/:id`

Update an existing configuration.

---

#### `DELETE /api/v1/configs/:id`

Delete a configuration by ID.

---

## 🗄️ Data Models

### BatteryChemistry

| Field | Type | Description |
|---|---|---|
| `id` | `String` | UUID primary key |
| `chemistryName` | `String` | Unique name (e.g. LFP, NMC, NCA) |
| `nominalVoltage` | `Float` | Nominal cell voltage (V) |
| `maxVoltage` | `Float` | Maximum charge voltage (V) |
| `minVoltage` | `Float` | Minimum discharge voltage (V) |
| `energyDensity` | `Int` | Energy density (Wh/kg) |
| `cycleLife` | `Int` | Expected cycle life |
| `safetyLevel` | `String` | Safety rating (e.g. High, Medium, Low) |
| `createdAt` | `DateTime` | Auto-set on create |
| `updatedAt` | `DateTime` | Auto-updated on change |

### ChemistryConfig

| Field | Type | Description |
|---|---|---|
| `id` | `String` | UUID primary key |
| `vehicleModel` | `String` | Target vehicle model |
| `chargeCutoffVoltage` | `Float` | Charge cutoff voltage (V) |
| `dischargeCutoffVoltage` | `Float` | Discharge cutoff voltage (V) |
| `temperatureLimit` | `Float` | Max operating temperature (°C) |
| `firmwareVersion` | `String` | Associated firmware version |
| `isActive` | `Boolean` | Whether config is active (default: true) |
| `chemistryId` | `String` | Foreign key to `BatteryChemistry` |

---

## 🛠️ Useful Prisma Commands

```bash
# View the database schema
npx prisma studio

# Re-generate Prisma client after schema changes
npx prisma generate

# Push schema changes to DB without migrations (dev)
npx prisma db push

# Create and apply a new migration
npx prisma migrate dev --name <migration-name>

# Check migration status
npx prisma migrate status

# List local prisma dev servers
npx prisma dev ls

# Stop the local database
npx prisma dev stop default

# Remove the local database instance
npx prisma dev rm default
```

---

## 🧑‍💻 Available Scripts

```bash
npm run dev     # Start development server with hot-reload
npm test        # Run tests (not yet configured)
```

---

## 📝 Notes

- All responses follow the format `{ success: boolean, data?: any, error?: string }`.
- Error responses in development mode include a `stack` trace field.
- The `chemistryName` field must be **unique** across all battery chemistry records.
- Creating a config requires a valid, existing `chemistryId`.

# 🔋 Battery Chemistry Management API

A production-style RESTful API for managing battery chemistries and OEM-specific battery configurations for an Intelligent Battery Management System (BMS).

Built using Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

---

# 🚀 Features

- Battery Chemistry CRUD APIs
- OEM / Vehicle Configuration Management
- Prisma ORM + PostgreSQL Integration
- Layered Architecture (Controller → Service → Repository)
- TypeScript Support
- Centralized Error Handling
- Validation-ready Structure
- RESTful API Design
- Health Monitoring Endpoint

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| TypeScript | Static Type Safety |
| Prisma ORM | Database ORM |
| PostgreSQL | Relational Database |
| Zod | Validation |
| Morgan | API Logging |
| Helmet | Security Middleware |
| Cors | Cross-Origin Resource Sharing |

---

# 📁 Project Structure

```bash
battery-chemistry-management/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── config/
│   │   └── prisma.ts
│   │
│   ├── controllers/
│   │   └── battery.controller.ts
│   │
│   ├── middleware/
│   │   └── errorHandler.ts
│   │
│   ├── repositories/
│   │   └── battery.repository.ts
│   │
│   ├── routes/
│   │   └── battery.routes.ts
│   │
│   ├── services/
│   │   └── battery.service.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/bms_backend.git
cd bms_backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/battery_management"
PORT=5000
```

---

## 4. Start Database

Make sure PostgreSQL is running locally.

---

## 5. Push Prisma Schema

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

---

## 6. Run Development Server

```bash
npm run dev
```

Server starts on:

```bash
http://localhost:5000
```

---

# 🌐 API Base URL

```bash
http://localhost:5000/api/v1
```

---

# 📌 API Endpoints

## 🩺 Health Check

| Method | Endpoint |
|---|---|
| GET | `/health` |

---

## 🔋 Battery Chemistry APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/chemistries` | Get all chemistries |
| GET | `/chemistries/:id` | Get chemistry by ID |
| POST | `/chemistries` | Create chemistry |
| PUT | `/chemistries/:id` | Update chemistry |
| DELETE | `/chemistries/:id` | Delete chemistry |

---

## ⚙️ Configuration APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/configs` | Get all configs |
| GET | `/configs/:id` | Get config by ID |
| POST | `/configs` | Create config |
| PUT | `/configs/:id` | Update config |
| DELETE | `/configs/:id` | Delete config |

---

# 🗄️ Database Models

## BatteryChemistry

| Field | Type |
|---|---|
| id | String |
| chemistryName | String |
| nominalVoltage | Float |
| maxVoltage | Float |
| minVoltage | Float |
| energyDensity | Int |
| cycleLife | Int |
| safetyLevel | String |

---

## ChemistryConfig

| Field | Type |
|---|---|
| id | String |
| vehicleModel | String |
| chargeCutoffVoltage | Float |
| dischargeCutoffVoltage | Float |
| temperatureLimit | Float |
| firmwareVersion | String |
| isActive | Boolean |
| chemistryId | String |

---

# 🔬 Example Chemistry Payload

```json
{
  "chemistryName": "LFP",
  "nominalVoltage": 3.2,
  "maxVoltage": 3.65,
  "minVoltage": 2.5,
  "energyDensity": 160,
  "cycleLife": 4000,
  "safetyLevel": "High"
}
```

---

# 🧪 Testing

API testing performed using:

- Postman
- Prisma Studio

Open Prisma Studio:

```bash
npx prisma studio
```

---

# 📦 Available Scripts

```bash
npm run dev
```

---

# 🔒 Future Improvements

- JWT Authentication
- Swagger Documentation
- Docker Support
- Unit Testing
- Role-Based Access Control
- Soft Delete Support
- Pagination & Filtering

---

# 👨‍💻 Author

Ajay Kumar

GitHub:
https://github.com/GADDAMAJAYKUMAR

---

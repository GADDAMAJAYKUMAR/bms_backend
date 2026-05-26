# API Contract README

## Overview
This repository implements a **Battery Chemistry Management** service with a RESTful JSON API. All endpoints are fully described in the OpenAPI 3.0 specification located at **`openapi.yaml`** in the project root.

The API covers three main domains:

1. **Authentication** – user registration, login, password‑reset and Google OAuth.
2. **Battery Chemistry** – CRUD operations for battery chemistry definitions.
3. **Configuration** – CRUD for configuration profiles that reference a chemistry.

A lightweight health‑check endpoint is also provided.

---

## How to use the contract

### 1. OpenAPI file
The contract lives in **`openapi.yaml`** (generated in the previous step). It can be consumed by:
- Swagger UI / Redoc for interactive documentation.
- Postman or Insomnia for testing collections.
- Code‑generation tools (e.g., `openapi-generator`, `swagger-typescript-api`) to scaffold client SDKs.

### 2. Running the documentation locally
```bash
# Install a simple viewer (if you don't have one already)
npm i -g swagger-cli
# Serve the spec at http://localhost:8080
swagger-cli serve openapi.yaml
```
Open a browser and navigate to the URL printed in the console. You will see a fully interactive page where you can try every endpoint.

### 3. Importing into Postman
1. Open Postman → `Import` → `File` → select **`openapi.yaml`**.
2. Postman will create a collection named *Battery Chemistry Management API* with all routes pre‑filled.
3. Set an **Authorization** header (`Bearer <token>`) for any request that requires authentication (see the **Security** section below).

### 4. Generating a TypeScript client (example)
```bash
# Install the generator
npm i -g @openapitools/openapi-generator-cli
# Generate a TypeScript fetch client
openapi-generator-cli generate -i openapi.yaml -g typescript-fetch -o ./client
```
The generated `client` folder contains typed functions for each endpoint, ready to be used in a front‑end application.

---

## Authentication & Security
- All protected routes require a **JWT** token in the `Authorization` header:
  ```http
  Authorization: Bearer <jwt-token>
  ```
- Tokens are issued by the **/auth/login** and **/auth/register** endpoints (as well as the Google OAuth callback).
- Tokens are validated by the `auth.middleware.ts` middleware.

### OAuth (Google)
The `/auth/google` endpoint redirects to Google; the callback (`/auth/google/callback`) validates the user and redirects back to the front‑end with a `token` query parameter.

---

## Endpoint summary
| Category | Method | Path | Description | Auth |
|----------|--------|------|-------------|------|
| **Auth** | `POST` | `/auth/register` | Register a new user (includes `confirmPassword`). | ❌ |
|  | `POST` | `/auth/login` | Login and receive a JWT. | ❌ |
|  | `POST` | `/auth/forgot-password` | Request a password‑reset token. | ❌ |
|  | `POST` | `/auth/reset-password` | Reset password using the token. | ❌ |
|  | `GET` | `/auth/google` | Initiate Google OAuth (handled by Passport). | ❌ |
|  | `GET` | `/auth/google/callback` | Google OAuth callback – redirects with JWT. | ❌ |
| **BatteryChemistry** | `GET` | `/chemistries` | List all chemistries. | ✅ |
|  | `GET` | `/chemistries/{id}` | Get a specific chemistry. | ✅ |
|  | `POST` | `/chemistries` | Create a new chemistry. | ✅ |
|  | `PUT` | `/chemistries/{id}` | Update an existing chemistry. | ✅ |
|  | `DELETE` | `/chemistries/{id}` | Delete a chemistry (fails if referenced). | ✅ |
| **ChemistryConfig** | `GET` | `/configs` | List configs (filterable). | ✅ |
|  | `GET` | `/configs/{id}` | Get a config by ID. | ✅ |
|  | `POST` | `/configs` | Create a new config. | ✅ |
|  | `PUT` | `/configs/{id}` | Update a config. | ✅ |
|  | `DELETE` | `/configs/{id}` | Delete a config. | ✅ |
| **Health** | `GET` | `/health` | Simple health‑check. | ❌ |

---

## Running the server locally
```bash
# Install dependencies (if not already done)
npm install
# Run the development server
npm run dev
```
The API will be available at **`http://localhost:5000/api/v1`**.

---

## Testing the contract
You can use the built‑in **npm script** that runs a basic integration test (if present) or manually exercise the API with `curl`:
```bash
# Register a user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Doe","email":"jane@example.com","password":"Secret123!","confirmPassword":"Secret123!","phoneNumber":"1234567890","acceptedTerms":true}'
```
Replace the token in subsequent calls, for example:
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"Secret123!"}' | jq -r '.data.token')

curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/v1/chemistries
```
---

## Versioning & Updates
- The **OpenAPI spec** is version‑controlled alongside the code. Any change to routes, request/response shapes, or authentication should be reflected by updating `openapi.yaml` and committing the change.
- Semantic versioning is recommended for the API (e.g., `v1`, `v2`). The current spec uses **`/api/v1`** as a path prefix.

---

## License & Contributions
This project is under the MIT license. Feel free to fork, open pull requests, or raise issues. When contributing new endpoints, remember to keep the OpenAPI spec in sync.

---

*Generated on 2026‑05‑26 by Antigravity AI.*

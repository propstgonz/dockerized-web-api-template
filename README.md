# Modular PostgreSQL Web API
#### This API connects a web application to a PostgreSQL database. It supports user management (registration, login, and CRUD operations). Built with Node.js and Express, it follows a RESTful, modular architecture to ensure easy maintenance, scalability, and deployment.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Installation & Configuration](#installation--configuration)
3. [Endpoints](#endpoints)
4. [Database Model](#database-model)
5. [Deployment](#deployment)
6. [Dependencies](#dependencies)
7. [License](#license)

---

## Project Structure
```
project-root/
├── Dockerfile
├── README.md
├── docker-compose.example
├── docker-compose.yml
├── front-end-example/
│   ├── README.md
│   ├── docker-compose.yml
│   └── html/
│       ├── api/
│       │   ├── config.js
│       │   ├── dashboard.js
│       │   ├── login.js
│       │   └── register.js
│       ├── dashboard.html
│       ├── index.html
│       ├── login.html
│       └── register.html
├── package-lock.json
├── package.json
└── src/
    ├── app.js..................... Entry point of the application
    ├── config/
    │   ├── database.js............ PostgreSQL database configuration
    │   └── schemaConfig.js........ Table and column configuration
    ├── controllers/
    │   └── apiController.js....... Business logic for API endpoints
    ├── models/
    │   └── apiModel.js............ Database queries and data handling
    └── routes/
        └── apiRoutes.js........... API route definitions
```

---

## Installation & Configuration

### Prerequisites
- Node.js (LTS recommended)
- Docker & Docker compose
- PostgreSQL database (local or remote)

### Clone the repository
```bash
git clone https://github.com/propstgonz/dockerized-web-api-template.git
cd dockerized-web-api-template
```

### Environment variables
Create a `.env` file in the project root based on `.env-sample`:
```bash
# Server configuration
PORT=3000

# PostgreSQL configuration
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=db_ip
DB_PORT=5432
DB_NAME=your_database_name

# Table configuration (all fields are easily configurable)
TABLE_NAME=users
PRIMARY_KEY=id
COLUMNS=username,email,user_password
```
> You can easily modify `TABLE_NAME` and `COLUMNS` to adapt the API to different tables or add/remove fields without changing the source code.

### Install dependencies
```bash
npm install
```

### Start the application
- **With Docker**:
```bash
docker compose up -d --build
```
---

## Endpoints

### `POST /api/login`
Login a user.
- Request body:
```json
{
  "identifier": "username_or_email",
  "user_password": "password"
}
```
- Responses:
  - `200 OK` → Login successful
  - `401 Unauthorized` → Incorrect password
  - `404 Not Found` → User not found
  - `400 Bad Request` → Missing credentials

### `POST /api/create`
Create/register a new user.
- Request body:
```json
{
  "username": "user",
  "email": "user@example.com",
  "user_password": "password"
}
```
- Responses:
  - `201 Created` → User created successfully
  - `500 Internal Server Error` → Server error

### `GET /api/items`
Retrieve all users/items.
- Response:
```json
[
  { "id": 1, "username": "user1", "email": "user1@example.com" },
  { "id": 2, "username": "user2", "email": "user2@example.com" }
]
```

### `GET /api/item/:id`
Retrieve a single user/item by ID.
- Response:
```json
{ "id": 1, "username": "user1", "email": "user1@example.com" }
```

### `PATCH /api/update/:id`
Update a user/item by ID.
- Request body: Only include fields to update:
```json
{
  "username": "newname",
  "email": "newemail@example.com"
}
```
- Response:
  - `200 OK` → Updated successfully
  - `404 Not Found` → Item not found

### `DELETE /api/delete/:id`
Delete a user/item by ID.
- Response:
  - `200 OK` → Item deleted successfully
  - `404 Not Found` → Item not found

---

## Database Model for testing
- **Database**: PostgreSQL (recommended version 16.3+)
- **Encoding**: UTF-8
- **Schema**: `public`
- **Table**: `users`
  | Field | Type | Description |
  |-------|------|-------------|
  | id | SERIAL | Primary key, unique user identifier |
  | username | VARCHAR | User's application username (unique) |
  | email | VARCHAR | User's email address (unique) |
  | user_password | VARCHAR | Hashed password for authentication |

> You can add or remove columns via `.env` without modifying the source code.

---

## Deployment

### Using Docker Compose
```bash
docker compose up -d --build
```
> Make sure `.env` variables are correctly set and PostgreSQL is accessible.

---

## Dependencies
- Express → Node.js web framework
- bcrypt → Password hashing and verification
- body-parser → Parsing JSON and URL-encoded request bodies
- CORS → Cross-origin requests handling
- dotenv → Environment variable management
- pg → PostgreSQL client for Node.js

---

## License
```txt
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
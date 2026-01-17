# User Management API

A RESTful API for user management built with [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), and [PostgreSQL](https://www.postgresql.org/).

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [License](#-license)

## ✨ Features

- **Authentication & Authorization**
  - JWT-based authentication with HTTP-only cookies
  - User registration and login
  - Password hashing with bcrypt
  - Protected routes with global AuthGuard
  - Public route decorator for open endpoints
- **User Management**
  - Full CRUD operations for users
  - User roles (Admin, User)
  - User status management (Active, Suspended)
  - Subscription plans (Free, Pro)
- **Pagination & Filtering**
  - Paginated user listings
  - Filter by status, role, and plan
  - Search by name or email
- **Analytics Dashboard**
  - User summary statistics
  - User growth data
  - Plan distribution analytics
  - Weekly activity tracking
- Input validation with class-validator
- PostgreSQL database with TypeORM
- Docker support for database

## 🛠 Tech Stack

- 🧠 **NestJS** — Scalable backend framework
- 🔐 **JWT** — JSON Web Token authentication
- 🔒 **bcrypt** — Password hashing
- 🗄 **PostgreSQL** — Relational database
- 🧬 **TypeORM** — Database ORM for TypeScript
- 🐳 **Docker** — Consistent local development

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [Docker](https://www.docker.com/) and Docker Compose

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd user-management-back
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=user_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=10m
```

### 4. Start the database

```bash
docker-compose up -d
```

### 5. Run the application

```bash
yarn start:dev
```

The API will be available at `http://localhost:3000`. Keep in mind to use the prefix 'api'. For example: `http://localhost:3000/api/users`

## 📡 API Endpoints

### Authentication

| Method | Endpoint         | Description                    | Auth Required |
| ------ | ---------------- | ------------------------------ | ------------- |
| `POST` | `/auth/register` | Register a new user            | No            |
| `POST` | `/auth/login`    | Login and get JWT cookie       | No            |
| `POST` | `/auth/logout`   | Logout and clear cookie        | Yes           |
| `GET`  | `/auth/profile`  | Get current user profile       | Yes           |
| `GET`  | `/auth/verify`   | Verify token and get user info | Yes           |

### Users

| Method   | Endpoint                   | Description               | Auth Required |
| -------- | -------------------------- | ------------------------- | ------------- |
| `GET`    | `/users`                   | Get all users (paginated) | Yes           |
| `GET`    | `/users/summary-analytics` | Get user analytics        | Yes           |
| `GET`    | `/users/:id`               | Get user by ID            | Yes           |
| `POST`   | `/users`                   | Create a new user         | Yes           |
| `PATCH`  | `/users/:id`               | Update a user             | Yes           |
| `DELETE` | `/users/:id`               | Delete a user             | Yes           |

### Query Parameters (GET /users)

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| `page`    | number | Page number (default: 1)                 |
| `limit`   | number | Items per page (default: 10, max: 50)    |
| `status`  | enum   | Filter by status (`active`, `suspended`) |
| `role`    | enum   | Filter by role (`admin`, `user`)         |
| `plan`    | enum   | Filter by plan (`free`, `pro`)           |
| `search`  | string | Search by name or email                  |

### Request Body Examples

#### Register User

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "company": "ABC Inc",
  "role": "user",
  "status": "active",
  "plan": "free"
}
```

#### Login

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Create/Update User

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "company": "ABC Inc",
  "role": "user",
  "status": "active",
  "plan": "free"
}
```

### User Properties

| Field       | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| `id`        | number | Auto-generated unique identifier      |
| `name`      | string | User's full name (min 2 characters)   |
| `email`     | string | Unique email address                  |
| `password`  | string | Hashed password (min 8 characters)    |
| `company`   | string | Company user works (min 3 characters) |
| `role`      | enum   | `admin` or `user`                     |
| `status`    | enum   | `active` or `suspended`               |
| `plan`      | enum   | `free` or `pro`                       |
| `lastLogin` | Date   | Last login timestamp (optional)       |
| `createdAt` | Date   | Account creation timestamp            |
| `updatedAt` | Date   | Last update timestamp                 |

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
├── auth/
│   ├── auth.module.ts      # Auth module
│   ├── auth.controller.ts  # Auth routes (login, register, etc.)
│   ├── auth.service.ts     # Auth business logic
│   ├── dto/
│   │   ├── login.dto.ts    # Login validation
│   │   └── register.dto.ts # Register validation
│   ├── guard/
│   │   └── auth.guard.ts   # JWT authentication guard
│   └── interfaces/
│       └── jwt-payload.interface.ts
├── common/
│   ├── pagination.dto.ts   # Pagination & filtering DTO
│   └── decorators/
│       └── public.decorator.ts  # Public route decorator
└── users/
    ├── users.module.ts     # Users module
    ├── users.controller.ts # Users controller (routes)
    ├── users.service.ts    # Users service (business logic)
    ├── dto/
    │   ├── create-user.dto.ts  # Create user validation
    │   └── update-user.dto.ts  # Update user validation
    ├── entities/
    │   └── user.entity.ts  # User database entity
    ├── enums/
    │   ├── user-role.enum.ts
    │   ├── user-status.enum.ts
    │   └── user-plan.enum.ts
    └── utils/
        ├── get-user-growth-data.ts
        ├── get-plan-distribution-data.ts
        └── get-weekly-activity-data.ts
```

## 📜 Available Scripts

| Script             | Description                               |
| ------------------ | ----------------------------------------- |
| `yarn start`       | Start the application                     |
| `yarn start:dev`   | Start in development mode with hot reload |
| `yarn start:debug` | Start in debug mode                       |
| `yarn start:prod`  | Start in production mode                  |
| `yarn build`       | Build the application                     |
| `yarn lint`        | Run ESLint                                |
| `yarn format`      | Format code with Prettier                 |

## 🐳 Docker

The project includes a `docker-compose.yml` file for running PostgreSQL:

```bash
# Start the database
docker-compose up -d

# Stop the database
docker-compose down

# View logs
docker-compose logs -f
```

## 📄 License

This project is licensed under the **MIT License**.

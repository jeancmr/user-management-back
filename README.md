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

- Full CRUD operations for user management
- User roles (Admin, User)
- User status management (Active, Suspended)
- Subscription plans (Free, Pro)
- Input validation with class-validator
- PostgreSQL database with TypeORM
- Docker support for database

## 🛠 Tech Stack

- 🧠 **NestJS** — Scalable backend framework
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

### Users

| Method   | Endpoint     | Description       |
| -------- | ------------ | ----------------- |
| `GET`    | `/users`     | Get all users     |
| `GET`    | `/users/:id` | Get user by ID    |
| `POST`   | `/users`     | Create a new user |
| `PATCH`  | `/users/:id` | Update a user     |
| `DELETE` | `/users/:id` | Delete a user     |

### Request Body Example (Create/Update User)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "plan": "free"
}
```

### User Properties

| Field       | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `id`        | number | Auto-generated unique identifier    |
| `name`      | string | User's full name (min 2 characters) |
| `email`     | string | Unique email address                |
| `role`      | enum   | `admin` or `user`                   |
| `status`    | enum   | `active` or `suspended`             |
| `plan`      | enum   | `free` or `pro`                     |
| `lastLogin` | Date   | Last login timestamp (optional)     |
| `createdAt` | Date   | Account creation timestamp          |
| `updatedAt` | Date   | Last update timestamp               |

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
└── users/
    ├── users.module.ts     # Users module
    ├── users.controller.ts # Users controller (routes)
    ├── users.service.ts    # Users service (business logic)
    ├── dto/
    │   ├── create-user.dto.ts  # Create user validation
    │   └── update-user.dto.ts  # Update user validation
    ├── entities/
    │   └── user.entity.ts  # User database entity
    └── enums/
        ├── user-role.enum.ts
        ├── user-status.enum.ts
        └── user-plan.enum.ts
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

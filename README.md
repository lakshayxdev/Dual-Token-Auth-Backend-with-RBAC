# 🔐 AuthFlow

A backend-focused authentication system built with **Node.js, Express, PostgreSQL, and JWT**.

The project implements a production-inspired authentication architecture using short-lived access tokens, long-lived refresh tokens, PostgreSQL-backed refresh sessions, password hashing, protected routes, and role-based access control.

## ✨ Features

- User signup and login
- Password hashing with bcrypt
- JWT-based authentication
- Short-lived access tokens
- Long-lived refresh tokens
- Refresh token persistence in PostgreSQL
- Automatic access-token renewal through refresh tokens
- Protected routes
- Role-based access control (USER / ADMIN)
- Parameterized SQL queries
- PostgreSQL foreign-key relationships
- Token expiration validation
- Secure authentication flow

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg**
- **JWT**
- **bcryptjs**
- **dotenv**
- **Postman**

## 🏗️ Project Structure

```text
Backend/
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── adminController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── utils/
│   └── tokens.js
│
├── sql/
│   └── schema.sql
│
├── db.js
├── server.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json

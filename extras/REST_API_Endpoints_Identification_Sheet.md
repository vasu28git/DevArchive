# REST API Endpoints Identification Sheet

## Project Name: DevArchive
## Base URL: `http://localhost:8080`
## Technology Stack: Spring Boot 3.x, Spring Security, JWT Authentication, MySQL, JPA/Hibernate

---

## 1. Authentication Module

### Base Path: `/users`

| S.No | Endpoint | HTTP Method | URL | Authentication | Description |
|------|----------|-------------|-----|----------------|-------------|
| 1 | User Signup | POST | `/users/signup` | Public (No Auth) | Registers a new user account |
| 2 | User Login | POST | `/users/login` | Public (No Auth) | Authenticates a user and returns a JWT token |
| 3 | Create User | POST | `/users` | Required (JWT) | Creates a new user directly (Admin-level) |
| 4 | Get All Users | GET | `/users` | Required (JWT) | Retrieves a list of all registered users |
| 5 | Get User by ID | GET | `/users/{id}` | Required (JWT) | Retrieves a specific user by their ID |
| 6 | Delete User | DELETE | `/users/{id}` | Required (JWT) | Deletes a user account by ID |

---

## 2. Bug Entry Module (Error Logging)

### Base Path: `/errors`

| S.No | Endpoint | HTTP Method | URL | Authentication | Description |
|------|----------|-------------|-----|----------------|-------------|
| 7 | Add Error | POST | `/errors/add_error` | Required (JWT) | Creates a new bug/error entry for the logged-in user |
| 8 | Get All Errors | GET | `/errors/get_errors` | Required (JWT) | Retrieves all bug entries belonging to the logged-in user |
| 9 | Get Error by ID | GET | `/errors/get_error/{id}` | Required (JWT) | Retrieves a specific bug entry by ID (owner only) |
| 10 | Update Error | PUT | `/errors/update_error/{id}` | Required (JWT) | Updates an existing bug entry (owner only) |
| 11 | Delete Error | DELETE | `/errors/delete_error/{id}` | Required (JWT) | Deletes a bug entry by ID (owner only) |
| 12 | Search by Topic | GET | `/errors/search/topic/{topic}` | Required (JWT) | Searches bug entries by topic name |
| 13 | Search by Language | GET | `/errors/search/language/{language}` | Required (JWT) | Searches bug entries by programming language |
| 14 | Search by Tag | GET | `/errors/search/tag/{tag}` | Required (JWT) | Searches bug entries by tag name |

---

## 3. Request & Response Structures

### 3.1 Signup Request

**Endpoint:** `POST /users/signup`

**Request Body:**
```json
{
  "email": "string (required)",
  "username": "string (required)",
  "password": "string (required)"
}
```

**Response:** `200 OK`
```
"User registered successfully.."
```

---

### 3.2 Login Request

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:** `200 OK`
```json
{
  "user_id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "message": "Login successful"
}
```

---

### 3.3 Add / Update Bug Entry

**Endpoint:** `POST /errors/add_error` | `PUT /errors/update_error/{id}`

**Request Body:**
```json
{
  "errorText": "string (required) — The error message or description",
  "solutionText": "string (required) — The solution/fix for the error",
  "programmingLanguage": "string (required) — e.g., Java, Python",
  "errorStackTrace": "string (optional) — Full stack trace of the error",
  "tags": "string (optional) — Comma-separated tags, e.g., \"spring,jpa\"",
  "tagNames": ["string"] ,
  "topic": "string (optional) — Topic/category, e.g., \"Database\""
}
```

**Response:** `200 OK`
```json
{
  "bugId": 1,
  "errorText": "NullPointerException at line 42",
  "solutionText": "Added null check before accessing the object",
  "programmingLanguage": "Java",
  "errorStackTrace": "java.lang.NullPointerException...",
  "tags": "spring,jpa",
  "tagNames": ["spring", "jpa"],
  "topic": "Backend",
  "userEmail": "user@example.com"
}
```

---

### 3.4 Get All Errors / Search Results

**Endpoint:** `GET /errors/get_errors` | `GET /errors/search/*`

**Response:** `200 OK`
```json
[
  {
    "bugId": 1,
    "errorText": "NullPointerException at line 42",
    "solutionText": "Added null check before accessing the object",
    "programmingLanguage": "Java",
    "errorStackTrace": "java.lang.NullPointerException...",
    "tags": "spring,jpa",
    "tagNames": ["spring", "jpa"],
    "topic": "Backend",
    "userEmail": "user@example.com"
  }
]
```

---

### 3.5 Delete Error

**Endpoint:** `DELETE /errors/delete_error/{id}`

**Response:** `200 OK`
```
"Bug entry deleted successfully"
```

---

## 4. Authentication & Authorization Details

| Feature | Details |
|---------|---------|
| Auth Mechanism | JWT (JSON Web Token) |
| Token Type | Bearer Token |
| Token Expiry | 24 hours (86400000 ms) |
| Hashing Algorithm | BCrypt |
| Session Policy | Stateless (No server-side sessions) |
| Header Format | `Authorization: Bearer <jwt_token>` |

### Public Endpoints (No Authentication Required):
- `POST /users/signup`
- `POST /users/login`

### Protected Endpoints (JWT Token Required):
- All other endpoints require a valid JWT token in the `Authorization` header.

### Authorization Rules:
- Bug entries are **user-scoped** — users can only view, update, and delete their own entries.
- Unauthorized access to another user's bug entry returns: `"Unauthorized - This error does not belong to you"`

---

## 5. Database Tables

| Table Name | Description | Key Columns |
|------------|-------------|-------------|
| `users` | Stores registered user accounts | `user_id (PK)`, `username`, `email`, `password`, `createdAt` |
| `bug_entries` | Stores bug/error entries logged by users | `bug_id (PK)`, `error_text`, `solution_text`, `programming_language`, `error_stack_trace`, `tags`, `topic`, `user_id (FK → users)` |
| `tags` | Master table for unique tags | `id (PK)`, `name (UNIQUE)` |
| `bug_entry_tags` | Junction table for many-to-many (bug ↔ tags) | `bug_id (FK)`, `tag_id (FK)` |

---

## 6. HTTP Status Codes Used

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| `200 OK` | Successful request | All successful operations |
| `400 Bad Request` | Validation failed | Missing required fields (email, password, errorText, etc.) |
| `401 Unauthorized` | Authentication failed | Invalid/missing JWT token |
| `403 Forbidden` | Access denied | Accessing another user's bug entry |
| `404 Not Found` | Resource not found | Invalid user ID or bug entry ID |
| `500 Internal Server Error` | Server error | Unexpected runtime exceptions |

---

## 7. Endpoint Summary Table

| Module | Total Endpoints | Public | Protected |
|--------|----------------|--------|-----------|
| Authentication (Users) | 6 | 2 | 4 |
| Bug Entries (Errors) | 8 | 0 | 8 |
| **Total** | **14** | **2** | **12** |

---

*Document Prepared For: DevArchive — Developer Error Archiving & Knowledge Management System*
*Date: February 12, 2026*

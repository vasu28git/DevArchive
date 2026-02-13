
# DevArchive Backend

## About the Project

DevArchive is a secure backend application designed to help developers store and manage programming errors along with their solutions.

Instead of repeatedly searching for the same fixes, users can save their errors, stack traces, solutions, and tags in one centralized system.

This project focuses purely on backend development using Spring Boot and JWT-based authentication.

---

## Tech Stack

- Java 21
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA (Hibernate)
- MySQL
- Maven

---

## Features

- User Registration and Login
- JWT-based Authentication
- Secure Protected Endpoints
- Create, Update, Delete Bug Entries
- Search Bugs by Topic, Language, and Tag
- User-specific Data Access (each user sees only their own data)
- Stateless Authentication (no server session)

---

## Security Design

- `/users/signup` and `/users/login` are public endpoints.
- All other endpoints require a valid JWT token.
- Passwords are encrypted using BCrypt.
- JWT tokens must be sent in the request header:

  Authorization: Bearer <your_token>

- Tokens expire after a configured time for security.

---

## Project Structure

src/main/java/com/example/devarchive

- config → Security configuration and JWT filter
- controller → REST controllers
- service → Business logic layer
- repository → Database access layer
- entity → JPA entities
- dto → Request and response objects

---

## Database Entities

User  
- user_id  
- username  
- email  
- password  

BugEntry  
- bug_id  
- errorText  
- solutionText  
- programmingLanguage  
- errorStackTrace  
- topic  
- tags  
- user_id (Foreign Key)

Tag  
- id  
- name  

Relationships:
- One User → Many BugEntries
- Many BugEntries ↔ Many Tags

---

## Running the Application

1. Clone the repository:

   git clone https://github.com/your-username/devarchive-backend.git

2. Configure MySQL database in application.properties:

   spring.datasource.url=jdbc:mysql://localhost:3306/devarchive_db  
   spring.datasource.username=root  
   spring.datasource.password=yourpassword  
   spring.jpa.hibernate.ddl-auto=update

3. Run using Maven Wrapper:

   mvnw.cmd spring-boot:run

Application runs at:
http://localhost:8080

---

## API Overview

Public Endpoints:
- POST /users/signup
- POST /users/login

Protected Endpoints:
- GET /users/me
- All /errors/** endpoints

---

## Future Improvements

- Role-based access (Admin)
- API documentation with Swagger
- Pagination for large datasets
- Frontend integration
- Deployment using Docker

---

Developed as an academic backend project focused on secure REST API design and JWT authentication.

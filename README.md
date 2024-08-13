# Eshop Admin Console

This project implements a simple admin dashboard for managing products and categories in an e-commerce shop. The dashboard includes a REST API for handling products and categories, as well as a frontend that interacts with this API.

## Features

- **REST API**: Manage products and categories with full CRUD (Create, Read, Update, Delete) operations.
- **Frontend Integration**: The frontend uses React and [@tanstack/react-query](https://tanstack.com/query/latest) to fetch and manage data from the API.
- **PostgreSQL Database**: The backend uses PostgreSQL as its database, with database interactions managed through Kysely, a SQL query builder for Node.js.

## Running the Project

### Backend

To set up and run the backend, follow these steps:

1. **Start PostgreSQL Database**:
   - The project includes a `docker-compose` file for running a PostgreSQL database. To start the database, run:
     ```bash
     docker-compose up -d
     ```

2. **Install Dependencies**:
   - Navigate to the backend directory and install the required dependencies:
     ```bash
     npm install
     ```

3. **Apply Database Migrations**:
   - Once the database is running, apply the migrations to create the necessary tables:
     ```bash
     npm run migrate
     ```

4. **(Optional) Generate Database Schema**:
   - You can generate the database schema, although it is already provided:
     ```bash
     npm run schema
     ```

5. **Seed the Database**:
   - Populate the database with initial data:
     ```bash
     npm run seed
     ```

6. **Start the Backend Server**:
   - Finally, start the backend server:
     ```bash
     npm run start
     ```

### Frontend

To set up and run the frontend, follow these steps:

1. **Install Dependencies**:
   - Navigate to the frontend directory and install the required dependencies:
     ```bash
     npm install
     ```

2. **Start the Frontend Server**:
   - Start the development server:
     ```bash
     npm run dev
     ```

The frontend will now be available, connected to the backend, and you can start managing products and categories.

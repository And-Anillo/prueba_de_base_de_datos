# Node.js & Express API with MySQL

This project is a RESTful API built with Node.js, Express, and connects to a MySQL database. It is designed for a software company that develops products for the electricity sector in Colombia. This README will guide you through setting up and running the project.

It uses the `mysql2` library for database interaction and `csv-parse` for processing CSV data.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL Server](https://www.mysql.com/downloads/)
- [Postman](https://www.postman.com/downloads/) (Recommended for API testing)

## Installation

Follow these steps to get your development environment set up:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies:**
    Run the following command to install the necessary npm packages.
    ```bash
    npm install
    ```

## Configuration

1.  **Set up the Database:**
    - Connect to your MySQL server.
    - Create a new database for the project. The original Spanish README suggests the name `gestion_de_base_datos`.
      ```sql
      CREATE DATABASE gestion_de_base_datos;
      ```
    - If you have a `.sql` file with table schemas, import it into your new database. If not, you may need to run a migration script if one is provided.

2.  **Environment Variables:**
    This project uses a `.env` file to store sensitive information like database credentials.
    - Create a file named `.env` in the root of the project directory.
    - Copy the contents of `.env.example` (if it exists) or use the template below and fill in your specific details.

    ```env
    # .env file
    
    # Server Configuration
    PORT=3000
    
    # MySQL Database Connection
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=gestion_de_base_datos
    ```

3.  **Initial Data Seeding (Optional):**
    If your project includes a script to parse a CSV file and populate the database, run it now.
    ```bash
    node scripts/seed-database.js
    ```

## Running the Application

Once the installation and configuration are complete, you can start the server.

```bash
npm start
```

The application should now be running on `http://localhost:3000` (or the port you specified in your `.env` file). You will see a confirmation message in your console.

## API Endpoints

The API provides the following endpoints.

| Method | Endpoint             | Description                       |
|--------|----------------------|-----------------------------------|
| `GET`    | `/api/items`         | Retrieves a list of all items.    |
| `GET`    | `/api/items/:id`     | Retrieves a single item by its ID.|
| `POST`   | `/api/items`         | Creates a new item.               |
| `PUT`    | `/api/items/:id`     | Updates an existing item by its ID.|
| `DELETE` | `/api/items/:id`     | Deletes an item by its ID.        |

*(Note: Replace `/api/items` with your actual resource endpoints, e.g., `/api/users`, `/api/products`)*

## Testing with Postman

You can use Postman to test the API endpoints.

1.  **Open Postman** and create a new request.
2.  **Set the HTTP Method:** Choose the appropriate method (`GET`, `POST`, `PUT`, `DELETE`).
3.  **Enter the Request URL:** For example, to get all items, use `http://localhost:3000/api/items`.
4.  **Body (for POST/PUT):** If you are creating or updating an item, go to the "Body" tab, select "raw", and choose "JSON" from the dropdown. Then, enter the JSON payload.
    ```json
    {
      "name": "New Item Name",
      "description": "A description for the new item."
    }
    ```
5.  **Send the request** and inspect the response from the server.

## Technologies Used

- **Backend:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Database Driver:** [mysql2](https://www.npmjs.com/package/mysql2)
- **CSV Parsing:** [csv-parse](https://www.npmjs.com/package/csv-parse)

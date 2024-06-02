# Banking Service

This project provides basic banking service like viewing the accounts linked and viewing the transactions. It's fully secured and provides sign-in/ sign-up options.
## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction
This project is mainly for people to access their basic banking information. 
- Create your account and sign-in 
- My accounts - Gives a list of banks belonging to you along with the balance
- View Transactions- gives all transactions and can have the following filters
    - Credit or debit
    - Minimum or maximum amount
    - Transactions following in particular duration like last 3 months or last 6 months.
    - Bank Name

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your local machine.
- [npm](https://www.npmjs.com/) package manager installed.
- [MySQL](https://www.mysql.com/)  database installed and running.
- [Git](https://git-scm.com/) installed on your local machine (optional, if using version control).

## Installation

Follow these steps to install and run the project on your local machine:

1. Clone the repository to your local machine using Git:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install the dependencies using npm for both backend and frontend one by one:
    ```bash
    cd backend
    npm install
    ```
    ```bash
    cd ..
    cd frontend
    npm install
    ```
4. Create a `.env` file in the root/backend and root/frontend directory of the project and configure any environment variables required. You can use the provided `.env - example` file as a template.

5. Start the Backend server:
    ```bash
    cd backend
    ```
    ```bash
    npm start
    ```

5. Start the Frontend server:
    ```bash
    cd frontend
    ```
    ```bash
    npm start
    ```
6. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

7. You're all set! You can now explore and interact with the project.

## Configuration
Create two `.env` files one inside the backend folder, other inside the frontend folder to store the enviornment variables. 
Insert the values according to your database configuration.
```plaintext
# Example .env file for backend

DB_USERNAME=root
DB_PASSWORD= "password"
DB_DATABASE= bankdb
DB_HOST=127.0.0.1
DB_DIALECT= mysql
PORT=3001
JWT_SECRET= secret
```
```
# Example .env file for frontend

REACT_APP_API_URL=http://localhost:3001/api
```

# Tech Help Desk - Backend
* Juan Esteban Garzón Luján
* Clan: Linus (Ubuntu)

## Description.
This is the backend of the Tech Help Desk application, developed with **NodeJS**, **NestJS** and using **TypeORM** to connect to **PostgreSQL**.

Tech Help Desk is a web application designed to manage and administer technical support tickets. It allows users to create tickets, assign technicians, update ticket statuses, and manage users, all based on an authentication and authorization system using JWT and roles.

This system is ideal for companies that need a portal to manage support requests, assign tasks to technicians, and track issues reported by customers.

## Prerequisites.

- Node.js >= 14.x
- PostgreSQL

## Installation.

1. Clone the repository:

    ```bash
    git clone https://github.com/EsstebanG/TechHelpDesk_evaluation
    ```

2. Open the folder with Visual Studio Code and install the dependencies:

    ```bash
    npm install
    ```

3. Configure the environment variables according to your data in the `.env` file located in the project root directory.:

    ```env
    # Server.
    NODE_ENV=development 
    PORT=3000

    # Database.
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=Qwe.123*
    DB_NAME=tech_help_desk

    # JWT.
    JWT_SECRET=super_secret_jwt_key
    JWT_EXPIRES_IN=3600s

    # Refresh Token
    JWT_REFRESH_SECRET=super_secret_refresh_key
    ```

4. Run the migrations (if there are none):

    ```bash
    npm run migration:run
    ```

5. Run the project:

    ```bash
    npm run start:dev
    ```

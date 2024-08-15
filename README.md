
# Todo Board

## Overview

This project is a Todo Board application built with Next.js, Tailwind CSS, Redux Toolkit, MongoDB, and React Hook Form. The project supports both development and production environments using Docker.

## How to Run the Project

### 1. Create a `.env` File in the Root

### 2. Choose Your Environment

Copy the data from `.env.local.example` for development mode or `.env.production.example` for production mode into the `.env` file.

### 3. Running in Production Mode

#### Steps:

1.  **Build the Production Container:**
    
    `docker build production .` 
    
2.  **Create the Network:**
    
    `docker network create todo-board-network` 
    
3.  **Start the Production Container:**

    `docker-compose up production` 
4. hit on `http://localhost:3003`
    

### 4. Running in Development Mode

#### Steps:

1.  **Build the Development Container:**
    
    `docker build todo-board-dev .` 
    
2.  **Create the Network:**
    
    `docker network create todo-board-network` 
    
3.  **Start the Development Container:**

    `docker-compose up to-do-board-dev` 
    
 4. hit on `http://localhost:3000`   

## Stack Used to Build the Project

-   **Docker**
-   **Next.js** with App Route
-   **API** built under Next.js
-   **Tailwind CSS**
-   **Redux Toolkit**
-   **MongoDB**
-   **React Hook Form**

## Features

-   **Authentication:** Login and Signup
-   **Create Category**
-   **Create Ticket**
-   **Drag and Drop:** Move tickets from one category to another without using any third-party library.
-   **Ticket Properties:** Title, Description, Expiry Date
-   **Edit Ticket:** Click on the text to make it editable. If left unsaved, the word "Draft" will appear beside the text and will be removed on a hard reload.
-   **Expiry Date Status:** Displayed in colored pill boxes with three statuses:
    -   Red: Expired
    -   Yellow: 6 hours left
    -   Green: More than 6 hours left
-   **Ticket History:** Click on a ticket to open a modal displaying the history.
-   **Full Project in TypeScript**

## Pros

-   The entire project is built with proper TypeScript.
-   All business logic is separated, making it easy to write unit tests for them.
-   Dockerized for easy setup and deployment.

## Cons

-   UI is not very polished.
-   Some edge case errors are not handled properly.
-   No session management; it uses purely cookie-based authentication.

## Potential Improvements

-   Enhance the UI to be more visually appealing.
-   Write E2E tests.
-   Write unit tests.
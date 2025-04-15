# Kanban Board Application

A drag-and-drop kanban board application for task management.

## Table of Contents

- [Features](#features)
- [Deployment to Render](#deployment-to-render)
  - [Prerequisites](#prerequisites)
  - [Deployment Steps](#deployment-steps)
  - [Manual Deployment](#manual-deployment)
    - [Backend Service](#backend-service)
    - [Frontend Service](#frontend-service)
- [Local Development](#local-development)
- [License](#license)

## Features

- Create, edit, and delete tickets
- Drag and drop tickets between swimlanes (Todo, In Progress, Done)
- User authentication
- Responsive design

## Deployment to Render

This application is configured for deployment on Render using the Blueprint feature.

### Prerequisites

1. A Render account
2. A PostgreSQL database (can be created on Render)

### Deployment Steps

1. Fork or clone this repository to your GitHub account
2. Connect your GitHub repository to Render
3. Use the "Blueprint" feature to deploy both the frontend and backend services
4. Set up the required environment variables in Render:
   - `JWT_SECRET`: A secret key for JWT token generation
   - `DATABASE_URL`: Your PostgreSQL connection string

### Manual Deployment

If you prefer to deploy manually:

#### Backend Service

1. Create a new Web Service on Render
2. Connect your repository
3. Use the following settings:
   - Name: kanban-backend
   - Environment: Node
   - Build Command: `cd server && npm install && npm run build`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     - NODE_ENV: production
     - JWT_SECRET: your-secret-key
     - PORT: 3001
     - DATABASE_URL: your-database-url

#### Frontend Service

1. Create a new Static Site on Render
2. Connect your repository
3. Use the following settings:
   - Name: kanban-frontend
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: client/dist
   - Environment Variables:
     - VITE_API_URL: https://your-backend-service-url.onrender.com/api

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   cd server && npm install
   cd client && npm install
   ```
3. Start the development servers:

   ```
   # In one terminal
   cd server && npm run dev

   # In another terminal
   cd client && npm run dev
   ```

4. Open http://localhost:3000 in your browser

## License

MIT

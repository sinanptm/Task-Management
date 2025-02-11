# Task Management System

A full-stack task management application built with React, TypeScript, Node.js, and MongoDB. The system allows users to create, read, update, and delete tasks with different priorities and statuses.

## Live Demo

- Frontend: [https://task-management-sinanptms.vercel.app/](https://task-management-sinanptms.vercel.app/)
- Backend API: [https://task.avm-ayurvedic.online/tasks](https://task.avm-ayurvedic.online/tasks)

## Features

- Create, read, update, and delete tasks
- Filter tasks by name, priority, and status
- Responsive design using ShadCN UI components
- Confirmation modal for deletion
- Task prioritization (Low, Medium, High)
- Task status tracking (To Do, In Progress, Completed)

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- ShadCN UI for components
- React Hook Form with Zod validation
- Axios for API requests
- TailwindCSS for styling

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- CORS for cross-origin resource sharing

## Project Setup

1. Clone the repository:
```bash
git clone git@github.com:sinanptm/Task-Management.git
cd Task_Management
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:

For client (client/.env):
```env
VITE_API_URL=http://localhost:8000
```

For server (server/.env):
```env
PORT=8000
MONGO_URI=mongodb+srv://yourmail:yourpassword@cluster0.8ysyzic.mongodb.net/Task_Management?retryWrites=true&w=majority&appName=Cluster0
CLIENT_URL=http://localhost:3000
```

4. Start both frontend and backend:
```bash
pnpm dev
```

Frontend will run on `http://localhost:3000` and backend on `http://localhost:8000`

## API Endpoints

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## Database Schema

```typescript
{
  id: string;
  name: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}
```

## Deployment

- Frontend is deployed on Vercel
- Backend is deployed on AWS with Nginx as reverse proxy
- Custom domain implementation with subdomain configuration for backend (task.avm-ayurvedic.online)
- Database is hosted on MongoDB Atlas
- Note: Heroku deployment pending due to card verification issues (in progress)

## AI Tools Usage

During the development of this project, the following AI tools were utilized:

- V0 AI: Used for generating styled components and UI design assistance
- Claude AI: 
  - Documentation generation and improvement
  - Code quality analysis and review
  - Technical documentation


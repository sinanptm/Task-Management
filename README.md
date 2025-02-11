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

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

### Frontend Setup

1. Clone the repository
2. Navigate to the client directory:
```bash
cd client
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the client directory with:
```
VITE_API_URL=https://task.avm-ayurvedic.online
```

5. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=https://task-management-sinanptms.vercel.app
```

4. Run the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:3000`

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
- Backend is deployed on AWS
- Database is hosted on MongoDB Atlas

## AI Tools Usage

During the development of this project, AI tools were used to:
- Generate initial project boilerplate
- Create TypeScript interfaces and type definitions
- Help with ShadCN UI component implementation
- Generate API endpoint documentation
- Debug and optimize code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
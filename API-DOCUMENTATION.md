# Task Management API Documentation

## Base URL
```
https://task.avm-ayurvedic.online/tasks
```

## Authentication
Currently, the API is open and does not require authentication.

## Response Format
All responses are returned in JSON format with the following structure:

### Success Response
```json
{
  "task": {
    "id": "string",
    "name": "string",
    "priority": "Low | Medium | High",
    "status": "To Do | In Progress | Completed",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Status Codes
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## Endpoints

### 1. Get All Tasks
Retrieves a list of all tasks.

**Request**
```http
GET /tasks
```

**Response**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Complete Project Documentation",
    "priority": "High",
    "status": "In Progress",
    "createdAt": "2024-02-11T10:00:00Z",
    "updatedAt": "2024-02-11T10:00:00Z"
  }
]
```

### 2. Create Task
Creates a new task.

**Request**
```http
POST /tasks
Content-Type: application/json

{
  "name": "string",
  "priority": "Low | Medium | High",
  "status": "To Do | In Progress | Completed"
}
```

**Required Fields**
| Field | Type | Description |
|-------|------|-------------|
| name | string | The name of the task |
| priority | string | Task priority (Low, Medium, High) |
| status | string | Task status (To Do, In Progress, Completed) |

**Response**
```json
{
  "task": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Complete Project Documentation",
    "priority": "High",
    "status": "To Do",
    "createdAt": "2024-02-11T10:00:00Z",
    "updatedAt": "2024-02-11T10:00:00Z"
  }
}
```

### 3. Edit Task
Updates an existing task.

**Request**
```http
PUT /tasks/:id
Content-Type: application/json

{
  "name": "string",
  "priority": "Low | Medium | High",
  "status": "To Do | In Progress | Completed"
}
```

**Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Task ID (MongoDB ObjectId) |

**Optional Fields**
All fields are optional. Only included fields will be updated.
| Field | Type | Description |
|-------|------|-------------|
| name | string | The name of the task |
| priority | string | Task priority (Low, Medium, High) |
| status | string | Task status (To Do, In Progress, Completed) |

**Response**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Updated Task Name",
    "priority": "Medium",
    "status": "In Progress",
    "createdAt": "2024-02-11T10:00:00Z",
    "updatedAt": "2024-02-11T10:30:00Z"
  }
}
```

### 4. Delete Task
Deletes a specific task.

**Request**
```http
DELETE /tasks/:id
```

**Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Task ID (MongoDB ObjectId) |

**Response**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Handling

### Validation Errors
```json
{
  "error": "Invalid task ID"
}
```

### Resource Not Found
```json
{
  "error": "Task not found"
}
```

## Data Models

### Task Schema
```typescript
{
  id: string;          // MongoDB ObjectId
  name: string;        // Task name
  priority: string;    // "Low" | "Medium" | "High"
  status: string;      // "To Do" | "In Progress" | "Completed"
  createdAt: Date;     // Timestamp of creation
  updatedAt: Date;     // Timestamp of last update
}
```

## Rate Limiting
Currently, there are no rate limits implemented.

## Versioning
The current version is v1 (implicit in the base URL). Future versions will be explicitly versioned (e.g., `/v2/tasks`).

## Development

### Local Setup
1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```
3. Set up environment variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```
4. Start the server:
```bash
pnpm dev
```

### Testing the API
You can test the API using tools like:
- Postman
- cURL
- Thunder Client
- Frontend application

Example cURL request:
```bash
curl -X POST \
  https://task.avm-ayurvedic.online/tasks \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "New Task",
    "priority": "High",
    "status": "To Do"
  }'
```

## Support
For any issues or questions, please open an issue in the GitHub repository.
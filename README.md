# Task Management App - Backend

This is the backend for a Task Management application, built using Node.js, Express, and MongoDB. The application supports user registration, login, and full task management operations (create, update, fetch, and delete tasks). The API is deployed on Render.

## 🌐 Deployed API Base URL

https://kazam-assignment.onrender.com

## 🛠️ Project Structure

```
/server
│
├── /src
│   ├── /database
│   │   └── db.js
│   ├── /model
│   ├── /routes
│   └── index.js
```

## 📋 API Endpoints

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/`              | Home route             |
| POST   | `/registration`  | User registration      |
| POST   | `/login`         | User login             |
| POST   | `/input`         | Create a new task      |
| PUT    | `/EditTask`      | Edit an existing task  |
| GET    | `/getAllTheTask` | Retrieve all tasks     |
| DELETE | `/DeleteTask`    | Delete a task          |
| ALL    | `*`              | Error route (fallback) |

## 🚀 Installation

1. Clone the repository:

```
https://github.com/Sarfaraz0730/Kazam-Assignment.git
```

2. Navigate to the project folder:

```
cd server
```

3. Install dependencies:

```
yarn install
```

4. Set up environment variables:

Create a `.env` file in the root directory and include:

```

```

5. Start the server:

```
yarn start
```

The server will run on `http://localhost:8000` 

## 🧪 Testing

You can use tools like Postman or Thunder Client to test the endpoints.

## 🔒 Authentication

- JWT (JSON Web Token) is used for authentication and protecting routes.

## 🏗️ Folder Structure

- **database**: MongoDB connection setup.
- **model**: Mongoose models.
- **routes**: API routes.
- **index.js**: Entry point for the server.

=
For FrontEnd
cd Client
run command to start the prontend project

npm run dev




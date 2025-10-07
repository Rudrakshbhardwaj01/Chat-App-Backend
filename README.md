# Chat App Backend

## Description

The Chat App Backend is a robust and scalable server application that powers a feature-rich chat platform. It enables secure user authentication, user profile management, direct messaging between users, message storage with text and image support, and user presence tracking. The backend manages user sessions, messaging flows, and notification logic, providing a structured and maintainable foundation for chat-based applications.

## Features

- **User Authentication:** Registration, login, and logout with secure password hashing.
- **User Profile Management:** Update profile picture and retrieve user details.
- **Private Messaging:** Send and retrieve messages (text and images) between users.
- **Message History:** Persistent storage and querying of past conversations.
- **User Presence:** Tracks which users are currently online.
- **Notifications:** Handles notification logic for new messages and user status changes.
- **Protected Routes:** Secured endpoints with JWT-based authentication middleware.

## Technologies Used

- **Programming Language:** JavaScript (Node.js)
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** JWT, bcryptjs
- **Environment Management:** dotenv
- **File Uploads:** Cloudinary
- **Session & Cookie Management:** cookie-parser
- **Cross-Origin Resource Sharing:** cors

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rudrakshbhardwaj01/Chat-App-Backend.git
   cd Chat-App-Backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory. See [Environment Variables](#environment-variables) for required keys.

4. **Start the Server**
   ```bash
   npm start
   ```
   For development (with auto-reload):
   ```bash
   npm run dev
   ```

## Usage

### Authentication

- **POST `/api/auth/signup`**  
  Register a new user.  
  **Request:**  
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  **Response:**  
  ```json
  {
    "_id": "userId",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": ""
  }
  ```

- **POST `/api/auth/login`**  
  Login with credentials.  
  **Request:**  
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  **Response:**  
  ```json
  {
    "_id": "userId",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": ""
  }
  ```

- **POST `/api/auth/logout`**  
  Logout current user.  
  **Response:**  
  ```json
  { "message": "Logged out successfully" }
  ```

- **PUT `/api/auth/update-profile`**  
  Update user profile picture (protected).  
  **Request:**  
  ```json
  { "profilePic": "base64-image-data" }
  ```
  **Response:**  
  ```json
  { ...updatedUser }
  ```

- **GET `/api/auth/check`**  
  Check authentication status (protected).  
  **Response:**  
  ```json
  { ...user }
  ```

### Messaging

- **GET `/api/messages/users`**  
  Get list of other users for sidebar (protected).  
  **Response:**  
  ```json
  [
    { "_id": "userId2", "fullName": "Jane Smith", "email": "jane@example.com", ... }
  ]
  ```

- **GET `/api/messages/:id`**  
  Get message history between authenticated user and another user (protected).  
  **Response:**  
  ```json
  [
    {
      "_id": "messageId",
      "senderId": "userId",
      "receiverId": "userId2",
      "text": "Hello!",
      "image": null,
      "createdAt": "2025-10-07T05:03:59.000Z"
    }
  ]
  ```

- **POST `/api/messages/send/:id`**  
  Send a new message to another user (protected).  
  **Request:**  
  ```json
  {
    "text": "Hi there!",
    "image": "base64-image-data" // optional
  }
  ```
  **Response:**  
  ```json
  {
    "_id": "messageId",
    "senderId": "userId",
    "receiverId": "userId2",
    "text": "Hi there!",
    "image": "https://cloudinary.com/image-url",
    "createdAt": "2025-10-07T05:03:59.000Z"
  }
  ```

## Database

### User Model

```js
{
  _id: ObjectId,
  email: String,        // unique
  fullName: String,
  password: String,     // hashed
  profilePic: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model

```js
{
  _id: ObjectId,
  senderId: ObjectId,   // references User
  receiverId: ObjectId, // references User
  text: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Create a `.env` file in the project root with the following keys:

| Name                    | Description                            |
|-------------------------|----------------------------------------|
| `PORT`                  | Server port number                     |
| `MONGO_URL`             | MongoDB connection string              |
| `JWT_SECRET`            | Secret key for JWT authentication      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image upload |
| `API_KEY`               | Cloudinary API key                     |
| `API_KEY_SECRET`        | Cloudinary API secret                  |
| `NODE_ENV`              | Environment (development/production)   |

## Contributing

1. Fork the repository and create a new branch for your feature or bugfix.
2. Make your changes with clear, descriptive commit messages.
3. Submit a pull request detailing your contribution.

## License

This project is licensed under the MIT License.

## Contact / Author

Developed by [Rudraksh Bhardwaj](https://github.com/Rudrakshbhardwaj01).  
For questions, open an issue or reach out via GitHub.

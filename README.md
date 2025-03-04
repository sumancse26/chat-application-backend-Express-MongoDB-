# Chat Application

## Overview

The Chat Application is a real-time messaging platform that allows users to exchange messages seamlessly. It leverages modern technologies for fast, secure, and efficient communication.

## Features

- **Real-time Messaging**: Instant communication between users.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Works on desktop, tablet, and mobile devices.
- **Group Chats**: Create and participate in group conversations (In future).
- **Message History**: Access previous messages at any time.
- **Typing Indicators**: See when someone is typing (In future).
- **Online Status**: Check if users are online or offline (In future).

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL database for storing user and message data)
- **WebSocket**: Socket.IO for real-time communication
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (version 16.x or above)
- MongoDB (local or cloud instance)
- Git

### Steps

1. Clone the repository:

   ```bash
    git clone https://github.com/sumancse26/chat-application-backend-Express-MongoDB-.git
    cd chat-application-backend-Express-MongoDB
   ```

2. Install dependencies:

   ```bash
    npm install
   ```

3. Set up environment variables:
   Create a .env file in the root directory and configure the following:

   ```bash
       MONGO_CONNECTION_STRING=""
       COOKIE_SECRET=fhgjaf67346$%$&@$&hdfjgerkue563536jgf$^%$DHF
       PORT=3000
       NODE_ENV=production
       JWT_SECRET=hfsdhgs^^^%85RJHBgugLPtwm8&5%CVMlwGFks
       JWT_EXPIRY=8640000
       COOKIE_NAME=token
   ```

4. Start the application:

   ```bash
    npm start
   ```

# Usage

- **Register a New Account**: Sign up to create a new account.
- **Log In**: Authenticate using existing credentials.
- **Start a Chat**: Initiate a chat with another user or create a new group chat.
- **Real-Time Messaging**: Send and receive messages instantly.

---

# API Endpoints

## Authentication

- `POST /api/register`  
  Register a new user.
- `GET /api/login/?username=suman@gmail.com&password=Sumansarkar1.`  
  Authenticate an existing user.

## Messages

- `GET /api/message/:id`  
  Retrieve messages for a specific conversation.
- `POST /api/message`  
  Send a new message.
- `PUT /api/message/:id`  
  Edit a message.
- `DELETE /api/message/:id`  
  Delete a message.

## Conversations

- `GET /api/inbox`  
  List all conversations for the authenticated user.
- `POST /api/inbox`  
  Create a new conversation.
- `DELETE /api/inbox/:id`  
  Delete a message.

# Contribution

We welcome contributions! Follow these steps to contribute:

1. **Fork the Repository**  
   Create your fork of the repository.

2. **Create a New Branch**  
   Create a branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit Your Changes**
   Commit your changes with a descriptive message:

   ```bash
   git commit -m "Add your message here"
   ```

4. **Push to Your Fork**  
   Push the changes to your fork:
   ```bash
   git push origin feature-name
   ```
5. **Open a Pull Request**  
   Submit a pull request to the main repository for review.

# Contact

For questions or support, please contact [suman.iu32@gmail.com].

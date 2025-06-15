
# 💬 Real-Time Chat Application

A full-stack real-time chat application built with **React (frontend)** and **Node.js + WebSocket + MongoDB (backend)**.

It enables users to join a chatroom, send and receive real-time messages, get notified when others join/leave, and see typing indicators—all powered by WebSockets and persistent MongoDB storage.

---

## 📦 Tech Stack

- **Frontend**: React, Redux, CSS
- **Backend**: Node.js, WebSocket (`ws`), MongoDB (with Mongoose)
- **Communication**: WebSocket protocol over `ws://` or `wss://`

---

## 🚀 Live Deployment

- **Frontend**: [Live App URL](https://your-frontend.vercel.app)
- **Backend**: Hosted WebSocket server at `wss://your-backend-url.com`

---

## 📁 Folder Structure

```
project-root/
├── frontend/       # React app
│   └── .env        # REACT_APP_WS_URL
├── backend/        # Node.js + WebSocket server
│   └── .env        # PORT, MONGODB_URI
└── README.md
```

---

## 🛠️ Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
```

Run the server:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
REACT_APP_WS_URL=ws://localhost:5000
```

Start the frontend app:

```bash
npm start
```

---

## 🧠 Application Architecture

### 📌 Backend (Node.js + WebSocket)

- Uses the `ws` package for WebSocket connections.
- Maintains a set of active clients (`clients`).
- On client `init`, assigns username and sends last 50 messages from MongoDB.
- Handles:
  - `message`: Broadcast to all clients
  - `typing`: Show typing indicator to others
  - `system`: Join/leave announcements

### 📌 Frontend (React + Redux)

- Redux is used to store:
  - `username`
  - `messages`
  - `typingUser`
- WebSocket connection is opened once the username is set.
- Features:
  - Smooth chat scroll
  - Input + send button
  - Typing indicator
  - Notification sound for new messages

---

## 🔄 Concurrency Handling

- All WebSocket messages are processed on the backend using `onmessage` listeners.
- Broadcasts are sent to all open WebSocket connections except the origin.
- Message delivery is instant and order-preserved due to single-threaded event loop of Node.js.
- Backend does **not** persist "who is online" — it’s designed stateless except for chat history.

---

## 🔗 Frontend <-> Backend Communication

### WebSocket Events:

| Event Type | Direction | Payload |
|------------|-----------|---------|
| `init` | → Backend | `{ username }` |
| `history` | ← Backend | `{ messages: [...] }` |
| `message` | ↔ Both | `{ message, timestamp }` |
| `typing` | → Backend | `{ type: 'typing' }` |
| `system` | ← Backend | `{ message: 'X joined', type: 'system' }` |

---

## 🤔 Assumptions & Design Decisions

- **Redux** was chosen to simplify state sharing across components (`username`, `messages`).
- **WebSocket** is used instead of polling to provide low-latency updates.
- **Typing Indicator** is a broadcast event triggered after user types.
- **MongoDB** stores only messages for persistence. No user accounts or presence tracking.
- **Messages** are fetched in reverse chronological order and reversed before sending to client.

---

## 🌍 Deployment Guidance

### Backend:
- Deploy to Render, Railway, or fly.io
- Use `wss://` in production
- MongoDB Atlas for cloud DB

### Frontend:
- Deploy to Vercel or Netlify
- Set `REACT_APP_WS_URL=wss://your-backend-url.com` in environment variables

---

## 👨‍💻 Author

- **Sangharsh**
- [LinkedIn](https://linkedin.com/in/your-profile) | [Portfolio](https://yourwebsite.com)

---

## 📝 License

This project is licensed under the MIT License.

# ⚡ Socket.IO MERN Chat App

A full-stack real-time chat application built with MongoDB, Express, React, Node.js, and Socket.IO.

## Features

- 🔐 JWT Authentication (register / login)
- 💬 Multi-room public chat
- ⚡ Real-time messaging via Socket.IO
- ✍️ Typing indicators
- 🟢 Online presence (user goes online/offline)
- 📜 Message history loaded from MongoDB on join
- 📩 Direct messages (DM) via socket events
- 🏠 Create chat rooms (broadcasts to all users)

## Project Structure

```
socket-mern/
├── server/
│   ├── index.js                     # Express + Socket.IO server
│   ├── models/
│   │   ├── User.js                  # bcrypt password hashing
│   │   ├── Room.js
│   │   └── Message.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── room.controller.js
│   │   └── message.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── room.routes.js
│   │   └── message.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js       # JWT protect + socket token verify
│   └── socket/
│       └── handlers.js              # All Socket.IO event handlers
│
└── client/
    └── src/
        ├── context/
        │   ├── AuthContext.jsx      # Auth state + axios token injection
        │   └── SocketContext.jsx    # Socket lifecycle + helper methods
        ├── hooks/
        │   └── useChat.js           # Per-room messages, typing, send
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Chat.jsx             # Main layout
        └── components/
            ├── MessageArea.jsx      # Chat window
            └── CreateRoomModal.jsx
```

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env   # fill in your MongoDB URI + JWT secret
npm install
npm start              # or: npx nodemon index.js
```

### 2. Frontend
```bash
cd client
cp .env.example .env   # VITE_API_URL and VITE_SOCKET_URL
npm install
npm run dev
```

## Socket.IO Events Reference

### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `room:join` | `roomId` | Join a chat room |
| `room:leave` | `roomId` | Leave a room |
| `message:send` | `{ roomId, content }` | Send a message |
| `typing:start` | `{ roomId }` | Start typing indicator |
| `typing:stop` | `{ roomId }` | Stop typing indicator |
| `dm:send` | `{ toUserId, content }` | Send a direct message |

### Server → Client
| Event | Payload | Description |
|-------|---------|-------------|
| `message:new` | Message object | New message in a room |
| `typing:start` | `{ userId, username }` | Someone started typing |
| `typing:stop` | `{ userId }` | Someone stopped typing |
| `room:userJoined` | `{ userId, username }` | User joined the room |
| `room:userLeft` | `{ userId, username }` | User left the room |
| `room:created` | Room object | A new room was created |
| `user:online` | `{ userId, username }` | User came online |
| `user:offline` | `{ userId, username }` | User went offline |
| `users:online` | `userId[]` | List of all online user IDs |
| `dm:received` | `{ from, content, timestamp }` | Received a DM |

## REST API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/rooms
POST   /api/rooms
GET    /api/rooms/:id
POST   /api/rooms/:id/join

GET    /api/messages/:roomId?limit=50&before=<ISO_DATE>
```

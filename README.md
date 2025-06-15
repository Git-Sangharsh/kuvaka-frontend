
# Kuvaka Frontend 🎯

This is the frontend of the **Kuvaka Chat Application**, built using **React**, **Redux**, and **WebSocket** for real-time messaging. It allows users to enter their name and join a chat room with others in real time.

---

## 🚀 Features

- 💬 Real-time chat using WebSocket
- 🎧 Notification sounds for new messages
- ✍️ Typing indicator for live typing feedback
- 🌙 Clean dark UI with responsive design
- 🔄 Auto-scroll to latest message
- ✅ Username form validation

---

## 📦 Tech Stack

- **React** with functional components and hooks
- **Redux** for state management
- **WebSocket** for real-time communication
- **CSS3** with custom animations
- **Audio notifications**
- **Framer Motion (optional)** for animations

---

## 🛠️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/kuvaka-frontend.git
cd kuvaka-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root with the following:

```env
REACT_APP_WS_URL=ws://localhost:5000
```

> Replace `localhost:5000` with your backend WebSocket server URL if deployed.

### 4. Start the development server
```bash
npm start
```

App runs at: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── assets/             # Media (e.g., notification sound)
├── components/
│   ├── chat/           # Chat UI (ChatBox.js)
│   └── form/           # Username form
├── store/              # Redux store & actions
├── App.js              # Root component
├── index.js            # Entry point
└── .env                # WebSocket URL
```

---

## 🔄 Frontend-Backend Communication

- Connects to WebSocket on app load.
- Sends:
  - `init`: when a user joins
  - `message`: when a user sends a message
  - `typing`: when a user is typing
- Listens for:
  - `history`: last 50 messages
  - `message`: new messages
  - `system`: join/leave updates
  - `typing`: typing notifications

---

## ⚙️ Design Decisions

- Username is stored globally using Redux for access across components.
- Chat scrolls to latest message automatically.
- Messages differentiated visually by sender.
- Typing indicator is shown only for others (not yourself).

---

## 📡 Deployed URL (if any)

> 🔗 [Frontend Live URL](https://kuvaka-frontend.vercel.app/)

Replace with actual deployed URL if available (e.g., Vercel or Netlify).

---

## 🙌 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

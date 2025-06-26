
# 🤖 AI Chat App

A production-ready, responsive AI-powered chat application built with React, TypeScript, WebSockets, and a FastAPI backend. Users can start real-time conversations with an AI assistant. It supports persistent sessions, chunked streaming responses, conversation history, and responsive UI optimized for mobile and desktop.

---

## 📦 Features

- ⚡️ Real-time AI chat using native WebSockets
- 🧠 Persistent user sessions with conversation history
- 📁 Dynamic chat list with new chat creation
- 🧼 Clean and responsive UI with TailwindCSS
- 🔐 Protected routes with Formik/Yup-based login form
- ✅ Typing indicator, delivery status, auto-scroll
- 🌍 Timezone-aware timestamps using `dayjs`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-chat-app.git
cd ai-chat-app
```

### 2. Install Dependencies

```bash
npm install
```

> This includes:
> - React 18+
> - Zustand for state management
> - Axios for API calls
> - Formik + Yup for login validation
> - React Router DOM for routing
> - TailwindCSS for UI styling

---

### 3. Environment Configuration

Create a `.env` file in the root with the following:

```env
VITE_API_URL=http://192.168.137.224:8000
```

> ⚠️ Make sure your backend WebSocket server is running at this URL.

---

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` (or your configured port).

---

## ✅ Login

- You must login first to create a session.
- The login creates a user via the API and stores the session in `localStorage`.

---

### 5. Run Tests

```bash
npm run test
```

> Currently, unit tests can be extended for WebSocket, state, and form validation logic.

---

## 🧠 Design Choices

### 🔌 WebSocket API Design

- The app uses **native `WebSocket`** instead of `socket.io` since the backend is powered by **FastAPI + Uvicorn**, which natively supports WebSockets.
- We handle **dynamic `conversation_id`**: it's excluded in the first message and included afterward using `live` message tracking from socket responses.

### 🧪 Async State Management

- Managed using **Zustand**, a simple and scalable alternative to Context API.
- Socket state (connected, onMessage, sendMessage) is stored globally via Zustand’s store.

### ⚙️ Routing & Protection

- **React Router v6** is used.
- Protected routes ensure only authenticated users (based on `localStorage`) can access `/chat`.
- Redirects prevent logged-in users from returning to the login screen.

### ✍️ Form Validation

- Used `Formik` + `Yup` for type-safe, declarative, and reusable form logic.
- Login form includes validation for email format and required username.

### 🧽 Code Quality Tools

- **ESLint** with TypeScript support to maintain code consistency.
- **Prettier** for formatting.
- Folder structure is modular:
  ```
  ├── api/
  ├── components/
  ├── features/chat/
  ├── hooks/
  ├── pages/
  ├── routes/
  ├── types/
  ```

### 🌐 Timezone Management

- All timestamps from the backend are in **UTC**.
- Converted to **local time using `dayjs.utc(...).local()`**.

---

## 📌 Roadmap

- ✅ Socket reconnection logic
- ✅ Per-user chat history
- 🔜 Add markdown/emoji support
- 🔜 Deploy on Vercel + Docker for backend

---

---

## 📄 License

MIT License — feel free to use and modify.
<h1 align="center">💬 Chat App Frontend</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-17.x-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-12.x-black?logo=next.js&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Socket.IO-4.x-red?logo=socket.io&style=for-the-badge" />
</p>

<p align="center">
  Frontend interface for a real-time chat application.<br />
  Built with <strong>React</strong>, <strong>Socket.IO</strong>, and <strong>Next.js</strong>.<br />
</p>

<p align="center">
  This project connects to the backend at:<br />
  <a href="https://github.com/MatheusIshiyama/chat-app-backend">chat-app-backend</a>
</p>

---

## 🧩 Overview

This is the client-side application for a full-stack real-time chat system.  
It allows users to register, login, manage friends, and exchange messages in real-time.

---

## ⚙️ Tech Stack

- **React**
- **Next.js**
- **Socket.IO Client**
- **CSS Modules**
- **JavaScript (ES6+)**

---

## 🔧 Features

- 🔒 Authentication (JWT-based)
- 📨 Send and receive messages in real time
- 🧑‍🤝‍🧑 Friend request system
- 💬 Dynamic chat list and updates
- 🎨 UI based on Figma wireframes

---

## 📁 Project Structure

```bash
chat-app-frontend/
├── assets/           # Wireframes, icons, etc.
├── css/              # Global styles and modules
├── pages/            # Route-based pages
├── services/         # API and Socket.IO logic
├── public/           # Static files (favicon, preview images)
└── package.json
```

---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/MatheusIshiyama/chat-app-frontend.git
cd chat-app-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Run the development server**

```bash
npm run dev
```

> The frontend expects the backend to run on `http://localhost:4000`

---

## 🧱 Wireframes

I designed the UI wireframes in **Figma**.  
You can view the original file [here](./assets/chat-app.fig).

![Wireframes Preview](./assets/chat-app-screens.png)

---

## 🚀 How It Works

### 1️⃣ Register & Confirm Email

Create an account and confirm your email address to get started.

![Register](./assets/chat-app-register.gif)

---

### 2️⃣ Login

After confirming your account, log in using your `username` and `password`.

![Login](./assets/chat-app-login.gif)

---

### 3️⃣ Add Friends

Send a friend request by entering your friend's `username`.

![Friend Requests](./assets/chat-app-friends.gif)

---

### 4️⃣ Start Chatting

Open a chat and start sending messages in real time!

![Messages](./assets/chat-app-messages.gif)

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 👤 Author

<p>
  <a href="https://github.com/MatheusIshiyama">
    <img src="https://img.shields.io/badge/GitHub-MatheusIshiyama-181717?logo=github&style=for-the-badge" />
  </a>
  <a href="https://linkedin.com/in/matheusishiyama">
    <img src="https://img.shields.io/badge/LinkedIn-matheusishiyama-%230077B5?logo=linkedin&logoColor=white&style=for-the-badge" />
  </a>
</p>

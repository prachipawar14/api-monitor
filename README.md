# 🚀 API Monitor

A full-stack web application to monitor API health, track performance, and visualize API performance through an interactive dashboard.

---

## 📌 Features

- 🔐 User Authentication (Register, Login, JWT Authentication)
- 📡 API Management (Add, Edit, Delete, View APIs)
- ⏱️ Automatic API Health Monitoring
- 📈 Performance Tracking & Monitoring History
- 📊 Interactive Dashboard with Statistics & Charts
- 🔍 Search, Sort & Filter APIs
- 📄 API Details Page
- 📝 Real-time Status Monitoring

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Chart.js
- react-chartjs-2

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Axios
- Node Cron
- CORS
- dotenv

---

## 📂 Project Structure

```
API-Monitor/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- MySQL
- Git

---

## Clone Repository

```bash
git clone https://github.com/your-username/API-Monitor.git
cd API-Monitor
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=api_monitor
JWT_SECRET=your_secure_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

## Database

Create a MySQL database named:

```sql
api_monitor
```

Import the database schema from:

```
docs/schema.sql
```









## License

This project is developed for learning and portfolio purposes.

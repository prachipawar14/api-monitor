# API Monitor
A full-stack web application to monitor API health, track performance, and visualize data!

## 🚀 Features
- ✅ User Authentication (Registration, Login, JWT, Logout)
- ✅ API CRUD Operations (Add, Edit, Delete, View APIs)
- ✅ Background Monitoring (Automatic health checks every minute)
- ✅ Monitoring History (Track past performance)
- ✅ Interactive Dashboard (Stats, Charts, Recent Activity)
- ✅ Search, Sort, and Filter APIs
- ✅ API Detail Page

## 🛠️ Tech Stack
### Backend
- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- node-cron (background scheduling)
- axios (HTTP requests)
- cors (Cross-Origin Resource Sharing)
- dotenv (environment variables)

### Frontend
- React
- React Router
- Axios
- Chart.js + react-chartjs-2
- Vite

## 📦 Installation & Setup
### Prerequisites
- Node.js (v16 or higher)
- MySQL
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd API-Monitor
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=api_monitor
   JWT_SECRET=your_jwt_secret_key (generate a long random string!)
   PORT=5000
   ```
4. Create MySQL Database and Tables:
   - Run the SQL script in `docs/schema.sql`

5. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend server:
   ```bash
   npm run dev
   ```

## 📚 API Documentation
See `docs/API.md` or use the Postman Collection in `docs/API Monitor.postman_collection.json`!

## 📊 Database Schema
See `docs/schema.sql` and `docs/ER-Diagram.png`!

## 🏗️ Architecture Diagram
See `docs/Architecture-Diagram.png`!

## 🚀 Deployment
For deployment instructions, see `docs/DEPLOYMENT.md`!
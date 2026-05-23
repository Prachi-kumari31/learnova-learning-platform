#  LearnNova Learning Platform  
# * A Digital Learning Platform For Inclusive and Quality Learning *

<p align="center">
  <img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Razorpay-%230072ff.svg?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay" />
</p>

# 📖 Project Overview

**LearnNova** is a full-stack web-based smart learning platform developed for students of Classes 6 to 12. The platform provides structured study materials, doubt discussion support, and online tests with automatic evaluation in a centralized digital environment.

The system is designed to simplify online learning by offering organized educational resources, interactive learning modules, and subscription-based premium features. LearnNova helps students improve learning efficiency while reducing dependency on multiple educational platforms.

🔗 **Project Type:** Full-Stack Web Application

# ✨ Features

## 📚 Smart Study Material System
- Subject-wise study notes and resources
- Organized learning content for Classes 6–12
- Easy navigation and structured dashboard

## 🧠 Online Test & Evaluation
- MCQ-based online tests
- Automatic result evaluation
- Performance-based learning support
- Instant score generation

## 💬 Doubt Discussion Forum
- Student discussion and doubt-solving platform
- Interactive learning environment
- Community-based knowledge sharing

## 💳 Subscription & Premium Access
- Secure subscription-based premium features
- Razorpay payment integration
- Premium educational content access

## 🔐 Authentication & Security
- Secure user registration and login
- JWT-based authentication system
- Protected admin and student routes

## 👨‍💼 Admin Management System
- Upload and manage study materials
- Create and manage tests
- Manage users and subscriptions
- Monitor overall platform activities


# 🛠️ Tech Stack

## Frontend
- React.js
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Payment Gateway
- Razorpay

## Authentication
- JWT Authentication


# 🚀 Getting Started

## Prerequisites
Make sure the following are installed on your system:

- Node.js
- MongoDB
- npm or yarn

# 📦 Installation & Setup

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/learnnova-learning-platform.git
```

## 2️⃣ Navigate to Project Folder
```bash
cd learnnova-learning-platform
```

## 3️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

## 4️⃣ Install Backend Dependencies
```bash
cd ../backend
npm install
```

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

# ▶️ Running the Project

## Start Backend Server
```bash
cd backend
npm start
```

## Start Frontend
```bash
cd frontend
npm start
```

The application will run at:

```bash
http://localhost:3000
```

# 📁 Project Structure

```bash
learnnova-learning-platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

# 📂 Core Modules

- 🔐 Authentication System
- 📚 Study Material Management
- 🧠 Online Test System
- 💬 Discussion Forum
- 💳 Subscription & Payment Module
- 👨‍💼 Admin Dashboard

# 🎯 Objectives

- Provide quality educational resources in one platform
- Simplify digital learning for school students
- Improve exam preparation through tests and notes
- Create an engaging and interactive learning environment
- Reduce dependency on multiple educational sources

# 🌟 Future Enhancements

- 🤖 AI-Based Personalized Learning Recommendations
- 🎥 Live Classes & Video Lectures
- 📊 Student Performance Analytics
- 📱 Mobile Application Support
- 🌐 Multi-Language Support
- 💬 AI Chatbot for Student Assistance
- 📈 Smart Progress Tracking

# 🔒 Security Features

- JWT-based secure authentication
- Protected admin routes
- Secure payment integration
- Safe database handling and user management

# 📄 License

This project is developed for educational and academic purposes.

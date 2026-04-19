# 🏥 Prescripto – Doctor Appointment & Prescription Management System

## 📌 Overview

Prescripto is a full-stack healthcare management system designed to streamline the process of booking doctor appointments, managing schedules, and handling prescriptions. The system provides role-based access for Patients, Doctors, and Admins, ensuring efficient and secure healthcare service management.

This project is built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with modern best practices including JWT authentication, RESTful APIs, and scalable architecture.

---

## 🚀 Features

### 👤 Patient Panel

* User registration & login (JWT-based authentication)
* Browse doctors by specialization
* Book & manage appointments
* View appointment history
* Access prescriptions

### 🩺 Doctor Panel

* Secure login
* Manage availability & schedules
* View patient appointments
* Add prescriptions
* Update profile information

### 🛠️ Admin Panel

* Manage doctors and patients
* Approve/reject doctor registrations
* Monitor appointments
* System analytics overview

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Axios
* React Router
* Tailwind CSS / CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Other Tools

* REST API
* Git & GitHub
* Postman (API testing)

---

## 📂 Project Structure

```
prescripto/
│── client/        # React Frontend
│── server/        # Node.js Backend
│── models/        # Database Models
│── routes/        # API Routes
│── controllers/   # Business Logic
│── middleware/    # Auth & Validation
│── config/        # DB & Environment Config
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/prescripto.git
cd prescripto
```

### 2️⃣ Setup Backend

```
cd server
npm install
```

Create a `.env` file in the server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

### 3️⃣ Setup Frontend

```
cd client
npm install
npm start
```

---

## 🔐 Authentication & Security

* JWT-based authentication
* Protected routes for role-based access
* Password hashing using bcrypt
* Secure API endpoints

---

## 📡 API Overview

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register user         |
| POST   | /api/auth/login    | Login user            |
| GET    | /api/doctors       | Get all doctors       |
| POST   | /api/appointments  | Book appointment      |
| GET    | /api/appointments  | Get user appointments |

---

## 🧪 Testing

* API testing using Postman
* Manual UI testing
* Error handling with proper status codes

---

## 🌍 Deployment (Recommended)

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas / Neon (PostgreSQL alternative)**

---

## 📈 Future Improvements

* Real-time notifications (Socket.io)
* Payment integration
* Video consultation
* Advanced analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit changes
4. Push and create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Mahmud Hasan Shanto.
Aspiring Software Engineer (Full Stack Developer)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

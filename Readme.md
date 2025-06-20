# 🛍️ Ratinginator - Ratings and Review System

Ratinginator is a full-stack web application that allows users to view products, submit reviews and ratings (with images or videos), and see others’ feedback. Inspired by Amazon-style reviews.

---

## 🚀 Features

- User Signup & Login (JWT-based)
- Product listing with average ratings
- Submit one review per product
- Upload photo or video with review
- Edit or delete your own review
- Tag extraction from review content
- Filter & sort reviews (rating, tags, date)
- Protected routes and media hosting

---

## 🧠 Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React, Tailwind CSS       |
| Backend   | Node.js, Express.js       |
| Database  | MySQL                     |
| Auth      | JWT (JSON Web Token)      |
| Uploads   | Multer, Express Static    |

---

## 📦 Folder Structure

## 🧩 Folder Structure

```plaintext
ratinginator/
├── client/                   # Frontend (React)
│   ├── components/           # Reusable UI (Navbar, ProductCard, StarRating, Modal)
│   ├── pages/                # Route Pages (Home, Login, Signup, ProductReview)
│   ├── App.jsx               # Route Management
│   ├── api.js                # Axios config with token headers
│   ├── index.css             # Tailwind styling
│   └── main.jsx              # React root render
│
├── server/                   # Backend (Node.js + Express + MySQL)
│   ├── controllers/          # Business Logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── reviewController.js
│   ├── middleware/           # JWT Auth Middleware
│   │   └── authMiddleware.js
│   ├── routes/               # API Endpoints
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── reviewRoutes.js
│   ├── uploads/              # Uploaded media (images/videos)
│   ├── db.js                 # MySQL connection pool
│   └── index.js              # Entry point for Express server
│
├── .env                      # Environment variables (server)
├── package.json              # Backend dependencies
└── README.md                 # Project Documentation

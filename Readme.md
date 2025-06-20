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

ratinginator/
├── client/                   # Frontend (React)
│   ├── components/           # Reusable UI components (Navbar, StarRating, ProductCard, etc.)
│   ├── pages/                # Page-level components (Home, Login, Signup, ProductReview)
│   ├── App.jsx               # Main app with routes
│   ├── api.js                # Axios instance with auth interceptor
│   ├── index.css             # Tailwind CSS styles
│   └── main.jsx              # React DOM rendering
│
├── server/                   # Backend (Node.js + Express)
│   ├── controllers/          # Logic for auth, product, and review routes
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── reviewController.js
│   ├── middleware/           # JWT verification middleware
│   │   └── authMiddleware.js
│   ├── routes/               # Express route definitions
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── reviewRoutes.js
│   ├── uploads/              # Uploaded media (images/videos for reviews)
│   ├── db.js                 # MySQL DB connection setup
│   └── index.js              # Express server entry point
│
├── .env                      # Environment variables
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation



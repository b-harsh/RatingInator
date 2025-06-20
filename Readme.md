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

```

## 🛠️ Setup Instructions

### 📌 Prerequisites

- [Node.js](https://nodejs.org/) ≥ v14  
- [MySQL](https://www.mysql.com/)  
- npm or yarn package manager

---

### 📌 Environment Configuration (`.env`)

Create a `.env` file in the backend root directory and add the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=ratinginator
JWT_SECRET=your_super_secret_key

```

## 📊 Database Schema & ER Diagram

# 📁 Tables

 users

| Field    | Type         | Key | Extra           |
| -------- | ------------ | --- | --------------- |
| id       | INT          | PK  | AUTO\_INCREMENT |
| username | VARCHAR(255) |     |                 |
| password | VARCHAR(255) |     | (Hashed)        |

 products

| Field | Type           | Key | Extra           |
| ----- | -------------- | --- | --------------- |
| id    | INT            | PK  | AUTO\_INCREMENT |
| name  | VARCHAR(255)   |     |                 |
| price | DECIMAL(10, 2) |     |                 |
| image | VARCHAR(255)   |     | URL to image    |

 reviews

| Field       | Type         | Key | Extra                      |
| ----------- | ------------ | --- | -------------------------- |
| id          | INT          | PK  | AUTO\_INCREMENT            |
| user\_id    | INT          | FK  | References `users.id`      |
| product\_id | INT          | FK  | References `products.id`   |
| rating      | INT (1 to 5) |     |                            |
| review      | TEXT         |     |                            |
| media\_path | VARCHAR(255) |     | path to uploaded media     |
| created\_at | TIMESTAMP    |     | DEFAULT CURRENT\_TIMESTAMP |


# 🧩 ER Diagram

```plaintext
┌────────────┐        ┌─────────────┐        ┌──────────────┐
│  Users     │        │  Reviews    │        │  Products    │
├────────────┤        ├─────────────┤        ├──────────────┤
│ id (PK)    │◄───────│ user_id (FK)│        │ id (PK)      │
│ username   │        │ product_id  ├───────►│ name         │
│ password   │        │ rating      │        │ price        │
└────────────┘        │ review      │        │ image        │
                      │ media_path  │        └──────────────┘
                      │ created_at  │
                      └─────────────┘
```

## ⚙️ How to Run

# Backend

```

cd server
npm install
node index.js

```

**Runs on:** [http://localhost:5000](http://localhost:5000)


# Backend

```

cd client
npm install
npm run dev

```

**Runs on:** [[http://localhost:5173](http://localhost:5173)


## 🧪 Testing Guide

### 🔐 Authentication Flow

- **Sign Up** → `POST /signup`
- **Login** → `POST /login` (Redirects to `/` after login)

---

### 🛍️ Product Display

- Products load with **images**, **names**, and **average ratings**
- Click **"Rate Now"** → Opens modal to:
  - Rate
  - Write a review
  - Upload image/video

- On submission:
  - Product's **average rating** updates

- Click **"Reviews and Ratings"** → View all reviews in detail

---

### 🧩 Review Features

- ✅ Edit/Delete own review
- 🔍 Filter reviews by **rating** or **tag**
- 🔃 Sort reviews by **date** or **rating**

---

### 🔒 Protected Routes

- ⭐ **Rating a product requires login**
- ✍️ **Only one review per product per user**
- 🔐 **Users can only edit/delete their own reviews**

---

## 📎 Media Uploads

- Uploaded media is stored in:  
  `/server/uploads/`

- Served via:  
  `http://localhost:5000/uploads/<filename>`

---

## 🧪 Postman / API Testing

| Method | Route               | Description             |
|--------|---------------------|-------------------------|
| POST   | `/api/auth/signup`  | Signup user             |
| POST   | `/api/auth/login`   | Login user              |
| GET    | `/api/products`     | Get all products        |
| GET    | `/api/products/:id` | Get product name        |
| GET    | `/api/reviews/:id`  | Get reviews for product |
| POST   | `/api/reviews/:id`  | Submit review           |
| PUT    | `/api/reviews/:id`  | Edit review             |
| DELETE | `/api/reviews/:id`  | Delete review           |




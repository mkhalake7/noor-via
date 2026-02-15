# Noor-via 🕯️

A modern, full-stack e-commerce application for artisanal candles, built with the MERN stack.

## ✨ Features
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT-based auth with secure password hashing
- **Admin Dashboard**: manage products, view inventory (protected route)
- **Currency**: localized pricing in **INR (₹)**
- **Image Uploads**: Cloudinary integration (ready for setup)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mkhalake7/noor-via.git
   cd noor-via
   ```

2. **Install Dependencies**
   ```bash
   # Install root/frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Configuration**
   - Create a `.env` file in `server/` based on `server/.env.example`.
   - See [CONFIGURATION.md](./CONFIGURATION.md) for detailed setup instructions.

4. **Seed Database** (Optional)
   Populate the database with initial products and creating an admin user:
   ```bash
   cd server
   npm run seed
   cd ..
   ```

5. **Run the App**
   Start both backend and frontend concurrently:
   ```bash
   # From the root directory
   npm run dev
   # (This starts backend on :5000 and frontend on :5173)
   ```

## 🔐 Admin Access
- **URL**: `/admin`
- **Default Credentials**: `admin@noorvia.com` / `admin123`

## 🛠️ Tech Stack
- **Frontend**: React, React Router, Lucide Icons
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB
- **Deployment**: Render (Backend) + Vercel (Frontend) ready

## 📄 License
MIT

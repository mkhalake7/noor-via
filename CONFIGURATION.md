# Noor-via Configuration Guide

## Backend (`server/`)

Create a `.env` file in the `server/` directory with the following variables:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173 # URL of the frontend app
```

## Frontend (`/`)

The frontend automatically connects to `/api` which is proxied to `localhost:5000` in development.

For **Production Deployment** (e.g., Vercel + Render):
1. Set `VITE_API_URL` in your build environment (e.g., Vercel Dashboard) to your backend URL (e.g., `https://noor-via-backend.onrender.com/api`).
2. Ensure the backend `CLIENT_URL` matches your frontend domain.

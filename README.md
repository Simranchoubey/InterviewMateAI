# InterviewMate AI

An AI-powered mock interview platform built with React, Node.js, Express, MongoDB, and Google Gemini AI.

## Features

- 🤖 **AI-Powered Questions**: Generate personalized interview questions using Google Gemini AI
- 🎯 **Role-Based Interviews**: Practice for specific job roles (Frontend, Backend, Full Stack, etc.)
- 📊 **Smart Evaluation**: Get detailed feedback on clarity, correctness, and confidence
- 🎤 **Voice Support**: Use speech-to-text for hands-free answering
- 📈 **Performance Tracking**: Monitor your progress with detailed analytics
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

**Frontend:**
- React 19 with Vite
- Tailwind CSS
- React Router v6
- Axios
- Lucide React Icons

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Google Gemini AI

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### Environment Setup

**Backend (.env in /server):**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/interviewmateai
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (.env in /client):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Installation

```bash
# Clone the repository
cd interview

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running Locally

```bash
# Start backend (from /server)
npm start

# Start frontend (from /client)
npm run dev
```

## Deployment

### Backend → Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `MONGO_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET`
   - `GEMINI_API_KEY`

### Frontend → Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set the following:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
4. Add environment variables:
   - `VITE_API_URL` (your Render backend URL, e.g., `https://interview-mate-api.onrender.com/api`)

### Database → MongoDB Atlas

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist IP `0.0.0.0/0` for access from Render
4. Copy the connection string to your Render environment variables

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Interview
- `POST /api/interview/start` - Start new interview
- `POST /api/interview/answer` - Submit answers
- `GET /api/interview/result` - Get interview results

### User
- `GET /api/user/history` - Get user's interview history

## License

ISC
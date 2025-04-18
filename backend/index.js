// backend/index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import path from 'path';

// Routes
import authRoutes from './Routes/authRoutes.js';
import usersRoutes from './Routes/UsersRoutes.js';
import emailRoutes from './Routes/emailRoutes.js';
import feedbackRoutes from './Routes/Feedbackroutes.js';
import orderRoutes from './Routes/orders.js';
import productRoutes from './Routes/productRoutes.js';
// Removed duplicate: productsRoutes

dotenv.config();
const app = express();

// File paths for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Destructure necessary variables from environment variables
const {
  MONGODB_URI,
  PORT = 5555,
  NODE_ENV = 'production',
  JWT_SECRET,
  ALLOWED_ORIGINS = 'http://localhost:3000,https://figu-ehzmewxue-pratyush-kumar-pandeys-projects.vercel.app',
} = process.env;

// Ensure that MongoDB URI and JWT Secret are provided
if (!MONGODB_URI || !JWT_SECRET) {
  console.error('❌ Missing MONGODB_URI or JWT_SECRET');
  process.exit(1);
}

// Middleware configuration
app.use(helmet());
app.use(compression());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'tiny'));

// ✅ Proper CORS for frontend + vercel
app.use(cors({
  origin: ALLOWED_ORIGINS.split(',').map(origin => origin.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting setup
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: '⚠️ Too many requests from this IP, please try again later.',
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

// Default route
app.get('/', (req, res) => {
  res.send(`<h2>🚀 API is Live!</h2><p><strong>Environment:</strong> ${NODE_ENV}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p>`);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `🚫 Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err);
  res.status(err.status || 500).json({
    error: err.name || 'InternalServerError',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Server startup
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Closing server...`);
  server.close(async () => {
    try {
      await mongoose.disconnect();
      console.log('✅ MongoDB disconnected.');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error during shutdown:', err);
      process.exit(1);
    }
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
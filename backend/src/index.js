// src/index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load .env – must be first
dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());          // parse JSON bodies

// ---------- Simple health‑check ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5000;

// Connect DB (if URI provided) before listening
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

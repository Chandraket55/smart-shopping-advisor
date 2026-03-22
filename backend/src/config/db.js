// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();

  if (!uri) {
    console.warn('⚠️  No MONGO_URI provided – DB connection skipped (useful for early dev).');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('🗄️  MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // crash the process – better than silently failing
  }
};

export default connectDB;

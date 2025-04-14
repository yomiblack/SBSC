import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('❌ MONGODB_URI is not defined in .env.local');
  }

  if (isConnected || mongoose.connection.readyState >= 1) {
    return; // Skip connection if already established
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

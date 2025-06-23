import mongoose from 'mongoose';
import logger from '../config/logger.config';

const MONGO_URI = process.env.MONGODB_URI ?? '';

export const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    const err = error as Error;
    logger.error(`MongoDB connection error: ${err.message}`);
    throw err;
  }
};

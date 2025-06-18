import mongoose from 'mongoose';
import logger from '../config/logger.config';

const MONGO_URI = process.env.MONGODB_URI || 'N/A';

export const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(`MongoDB connection error: ${(error as Error).message}`);
    process.exit(1);
  }
};
import mongoose from 'mongoose';
import { config } from '../config/config';

export const connect = async () => {
  try {
    if (!config.DATABASE_URL) {
      throw new Error('DATABASE_URL not provided');
    }

    await mongoose.connect(config.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = () => {
  if (!config.DATABASE_URL) {
    return;
  }
  mongoose.disconnect();
};

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL,
};

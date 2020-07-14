import { Document, Model } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isSupport: boolean;
}

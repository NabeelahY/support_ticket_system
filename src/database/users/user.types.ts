import { Document, Model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
  isSupport: boolean;
}

export interface UserDocument extends User, Document {}
export interface UserModel extends Model<UserDocument> {
  id: string;
  username: string;
  email: string;
  password: string;
  isSupport: boolean;
}

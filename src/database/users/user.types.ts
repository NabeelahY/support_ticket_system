import { Document, Model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends User, Document {}
export interface UserModel extends Model<UserDocument> {}
import { Document, Model } from 'mongoose';

export interface Customer {
  username: string;
  email: string;
  password: string;
}

export interface CustomerDocument extends Customer, Document {}
export interface CustomerModel extends Model<CustomerDocument> {}
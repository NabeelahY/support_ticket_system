import { Document, Model } from 'mongoose';

export interface Support {
  created_by: string;
  message: string;
  status: string;
  title: string;
}

export interface SupportDocument extends Support, Document {}
export interface SupportModel extends Model<SupportDocument> {
  created_by: string;
  message: string;
  status: string;
  title: string;
}

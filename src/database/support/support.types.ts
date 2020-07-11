import { Document, Model } from 'mongoose';
import { Comment } from '../comment/comment.types';

export interface Support {
  created_by: string;
  message: string;
  status: string;
  title: string;
  comments: Comment[];
}

export interface SupportDocument extends Support, Document {}
export interface SupportModel extends Model<SupportDocument> {
  created_by: string;
  message: string;
  status: string;
  title: string;
}

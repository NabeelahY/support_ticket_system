import { Document } from 'mongoose';
import { Comment } from '../comment/comment.types';

export interface Support extends Document {
  created_by: string;
  message: string;
  status: string;
  title: string;
  comments: Comment[];
}

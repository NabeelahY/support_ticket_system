import { Document, Model } from 'mongoose';

export interface Comment {
  created_by: string;
  comment: string;
  ticket_id: string;
}

export interface CommentDocument extends Comment, Document {}
export interface CommentModel extends Model<CommentDocument> {
  created_by: string;
  comment: string;
  ticket_id: string;
}

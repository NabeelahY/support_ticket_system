import { Document, Model } from 'mongoose';
import {UserDocument} from '../users/user.types'

export interface Support {
  created_by: UserDocument;
  message: string;
  status: string;
}

export interface SupportDocument extends Support, Document {}
export interface SupportModel extends Model<SupportDocument> {}
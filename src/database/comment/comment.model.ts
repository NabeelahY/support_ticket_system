import { model } from 'mongoose';

import { CommentDocument } from './comment.types';
import { CommentSchema } from './comment.schema';

export const CommentModel = model<CommentDocument>('comment', CommentSchema);

import { CommentDocument } from './comment.types';
import { CommentModel } from './comment.model';
import { SupportModel } from '../support/support.model';

interface CommentParams {
  params: {
    created_by: string;
    comment: string;
  };
  ticketId: string;
}

export class CommentMethods {
  static async createComment({
    ticketId,
    params,
  }: CommentParams): Promise<{ newComment: CommentDocument }> {
    let newComment = new CommentModel(params);
    await newComment.save();
    await SupportModel.findByIdAndUpdate(
      ticketId,
      {
        $push: {
          comments: {
            _id: newComment._id,
            created_by: newComment.created_by,
            comment: newComment.comment,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );
    return { newComment };
  }
}

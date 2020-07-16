import { Comment } from './comment.types';
import { CommentModel } from './comment.model';
import { SupportModel } from '../support/support.model';

interface CommentParams {
  params: {
    created_by: string;
    comment: string;
    ticket_id: string;
  };
  ticketId: string;
}

export class CommentMethods {
  static async createComment({
    ticketId,
    params,
  }: CommentParams): Promise<{ newComment: Comment }> {
    let newComment = new CommentModel(params);
    await newComment.save();

    const ticket = await SupportModel.findOne({ _id: ticketId });

    // If the comment array is empty, the status of the ticket should be updated to 'IN-REVIEW'
    // This is to enable customers to comment back. Customers cannot comment until a support agent does so
    ticket?.comments.length === 0
      ? await SupportModel.findByIdAndUpdate(
          ticketId,
          {
            status: 'IN-REVIEW',
            $push: {
              comments: {
                _id: newComment._id,
                created_by: newComment.created_by,
                comment: newComment.comment,
                ticket_id: newComment.ticket_id,
              },
            },
          },
          { new: true, useFindAndModify: false }
        )
      : await SupportModel.findByIdAndUpdate(
          ticketId,
          {
            $push: {
              comments: {
                _id: newComment._id,
                created_by: newComment.created_by,
                comment: newComment.comment,
                ticket_id: newComment.ticket_id,
              },
            },
          },
          { new: true, useFindAndModify: false }
        );
    return { newComment };
  }
}

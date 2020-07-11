import { CommentDocument } from './comment.types';
import { CommentModel } from './comment.model';
import { SupportModel } from '../support/support.model';

interface CommentParams {
  params: {
    created_by: string;
    comment: string;
  };
  productId: string;
}

export class CommentMethods {
  static async createComment({
    productId,
    params,
  }: CommentParams): Promise<{ newComment: CommentDocument }> {
    let newComment = new CommentModel(params);
    await newComment.save();
    await SupportModel.findByIdAndUpdate(
      productId,
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

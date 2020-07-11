import { Schema } from 'mongoose';

export const CommentSchema = new Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

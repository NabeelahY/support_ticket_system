import { Schema } from 'mongoose';

export const SupportSchema = new Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      required: true,
      enum: ['OPEN', 'PROCESSING', 'REVIEWING', 'DONE'],
      default: 'OPEN',
    },
  },
  { timestamps: true }
);

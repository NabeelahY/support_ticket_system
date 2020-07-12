import { body } from 'express-validator';
export const commentFields = [
  body('comment')
    .isString()
    .isLength({ min: 3 })
    .withMessage(
      'Comment is required. It should have a minimum of 3 characters.'
    ),
];

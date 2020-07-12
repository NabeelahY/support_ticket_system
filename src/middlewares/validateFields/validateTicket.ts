import { body } from 'express-validator';
export const ticketFields = [
  body('title')
    .isString()
    .isLength({ min: 3 })
    .withMessage(
      'Title is required. It should have a minimum of 3 characters.'
    ),
  body('message')
    .isString()
    .isLength({ min: 5 })
    .withMessage(
      'Please enter your message, it is required and should have a minimum of 5 characters.'
    ),
];

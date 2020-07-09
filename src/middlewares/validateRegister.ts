import { body } from 'express-validator';
export const registerFields = [
  body('username')
    .isString()
    .isLength({ min: 2 })
    .withMessage(
      'Username is required and must have a minimum of 2 characters'
    ),
  body('email').isEmail().withMessage('Email is required and must be valid'),
  body('password')
    .isString()
    .isLength({ min: 7 })
    .withMessage(
      'Password is required and must have a minimum of 7 characters'
    ),
];

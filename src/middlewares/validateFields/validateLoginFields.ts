import { body } from 'express-validator';
export const userLoginFields = [
  body('username').isString().isLength({ min: 2 }).optional().withMessage('Username is required'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email is required and should be valid'),
  body('password').isString().isLength({ min: 7 }).withMessage('Password is required and must have a minimum of 7 characters'),
];

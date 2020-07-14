import { body } from 'express-validator';
export const userStatusFields = [
  body('isSupport')
    .isBoolean()
    .optional()
    .withMessage("Value should be 'true' or 'false'"),
  body('isAdmin')
    .isBoolean()
    .optional()
    .withMessage("Value should be 'true' or 'false'"),
];

import { check } from 'express-validator';
export const statusField = [
  check('status')
    .isIn(['OPEN', 'IN-REVIEW', 'RESOLVED'])
    .withMessage(
      "Invalid option. Status can either be 'OPEN', 'IN-REVIEW' or 'RESOLVED'"
    ),
];

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default (validations: any) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all(validations.map((validation: any) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errMsg = errors.array().map((err) => {
    return { message: err.msg, field: err.param };
  });
  res.status(422).json({ errors: errMsg });
};

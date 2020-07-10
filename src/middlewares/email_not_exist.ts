import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../database/user/user.model';

export const emailDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (user) {
    return res
      .status(404)
      .json({ error: 'Email already exists. Please use another.' });
  }
  next();
};

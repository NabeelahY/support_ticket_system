import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../database/user/user.model';

export const usernameDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await UserModel.findOne({
    username: req.body.username,
  });

  if (user) {
    return res
      .status(400)
      .json({ error: 'Username already exists. Please use another.' });
  }
  next();
};

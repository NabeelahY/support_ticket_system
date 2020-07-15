import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../database/user/user.model';
import { User } from '../database/user/user.types';

declare global {
  namespace Express {
    interface Request {
      userDetails: User;
    }
  }
}

export const userIdDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.userId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist. Please use existing user's id." });
    }
    req.userDetails = user;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: "User does not exist. Please use existing user's id." });
  }
};

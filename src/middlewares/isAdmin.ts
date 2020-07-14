import { Request, Response, NextFunction } from 'express';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIsAdmin = req.decoded.isAdmin;
    if (!userIsAdmin) {
      return res.status(401).json({
        message:
          'You are not authorized to access this. Only admins are allowed.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: 'error' });
  }
};

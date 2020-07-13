import { Request, Response, NextFunction } from 'express';

export const isSupportAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIsSupport = req.decoded.isSupport;
    if (!userIsSupport) {
      return res.status(401).json({
        message:
          'You are not authorized to access this. Only support agents are allowed.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

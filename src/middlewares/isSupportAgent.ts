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
          'You are not authorized to update this ticket. Only support agents can do that.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

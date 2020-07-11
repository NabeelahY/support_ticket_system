import { Request, Response, NextFunction } from 'express';
import { SupportModel } from '../database/support/support.model';

export const userCannotComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await SupportModel.findById(req.params.ticketId);
    if (ticket!.status !== 'REVIEWING') {
      return res.status(401).json({
        message: 'Your ticket has not been reviewed yet. Please be patient.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

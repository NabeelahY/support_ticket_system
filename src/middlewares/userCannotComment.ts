import { Request, Response, NextFunction } from 'express';
import { SupportModel } from '../database/support/support.model';

export const userCannotComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await SupportModel.findById(req.params.ticketId);
    
    const userIsSupport = req.decoded.isSupport
    if (ticket!.status !== 'REVIEWING' && !userIsSupport) {
      return res.status(400).json({
        message: 'Your ticket has not been reviewed yet. Please be patient.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

import { Request, Response, NextFunction } from 'express';
import { SupportModel } from '../database/support/support.model';

export const userCannotComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await SupportModel.findById(req.params.ticketId);

    // req.decoded is coming from the restricted middleware
    // This checks if the logged user is a support agent
    const userIsSupport = req.decoded.isSupport;
    if (ticket!.status !== 'IN-REVIEW' && !userIsSupport) {
      return res.status(400).json({
        message: 'Your ticket has not been reviewed yet. Please be patient.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

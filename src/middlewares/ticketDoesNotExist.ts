import { Request, Response, NextFunction } from 'express';
import { SupportModel } from '../database/support/support.model';
import { Support } from '../database/support/support.types';

declare global {
  namespace Express {
    interface Request {
      ticketDetails: Support;
    }
  }
}

export const ticketDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await SupportModel.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({
        error:
          "Support ticket does not exist. Please use existing ticket's id.",
      });
    }
    req.ticketDetails = ticket;

    next();
  } catch (error) {
    return res.status(400).json({
      error: "Support ticket does not exist. Please use existing ticket's id.",
    });
  }
};

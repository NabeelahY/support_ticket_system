import { Router, Request, Response } from 'express';
import { SupportMethods } from '../../database/support/support.statics';
import { restricted } from '../../middlewares/restricted';

const router = Router();

router.get(
  '/ticket/past-month',
  restricted,
  async (req: Request, res: Response) => {
    try {
      const tickets = await SupportMethods.getPastMonthTickets();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as getPastTicketsRouter };

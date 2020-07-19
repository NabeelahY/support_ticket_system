import { Router, Request, Response } from 'express';
import { isAdmin } from '../../middlewares/isAdmin';
import { restricted } from '../../middlewares/restricted';
import { SupportMethods } from '../../database/support/support.statics';
import { isSupportAgent } from '../../middlewares/isSupportAgent';

const router = Router();

router.get(
  '/all/tickets',
  restricted,
  isSupportAgent,
  async (req: Request, res: Response) => {
    try {
      const { tickets } = await SupportMethods.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as getAllTicketRouter };

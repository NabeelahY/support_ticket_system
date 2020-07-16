import { Router, Request, Response } from 'express';
import { SupportMethods } from '../../database/support/support.statics';
import { restricted } from '../../middlewares/restricted';
import { ticketDoesNotExist } from '../../middlewares/ticketDoesNotExist';

const router = Router();

router.get(
  '/tickets/:ticketId',
  restricted,
  ticketDoesNotExist,
  async (req: Request, res: Response) => {
    try {
      const ticketId = req.params.ticketId;
      const ticket = await SupportMethods.getTicketById(ticketId);
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as getTicketByIdRouter };

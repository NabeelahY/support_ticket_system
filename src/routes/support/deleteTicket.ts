import { Router, Request, Response } from 'express';
import { isAdmin } from '../../middlewares/isAdmin';
import { restricted } from '../../middlewares/restricted';
import { SupportMethods } from '../../database/support/support.statics';
import { ticketDoesNotExist } from '../../middlewares/ticketDoesNotExist';

const router = Router();

router.delete(
  '/delete/ticket/:ticketId',
  restricted,
  ticketDoesNotExist,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const ticketId = req.params.ticketId;
      const { ticket } = await SupportMethods.deleteTicket(ticketId);
      res.status(200).json({ deletedTicket: ticket });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as deleteTicketRouter };

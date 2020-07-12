import { Router, Request, Response } from 'express';
import { SupportMethods } from '../../database/support/support.statics';
import { restricted } from '../../middlewares/restricted';
import { ticketDoesNotExist } from '../../middlewares/ticketDoesNotExist';
import { isSupportAgent } from '../../middlewares/isSupportAgent';

const router = Router();

router.put(
  '/tickets/:ticketId',
  restricted,
  isSupportAgent,
  ticketDoesNotExist,
  async (req: Request, res: Response) => {
    try {
      const ticketId = req.params.ticketId;
      req.ticketDetails.status = req.body.status;
      const ticket = await SupportMethods.updateTicketStatus(
        ticketId,
        req.ticketDetails
      );
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as updateTicketRouter };

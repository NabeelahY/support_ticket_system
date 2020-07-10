import { Router, Request, Response } from 'express';
import { SupportMethods } from '../../database/support/support.statics';
import { restricted } from '../../middlewares/restricted';
import validate from '../../middlewares/validate';
import { ticketFields } from '../../middlewares/validateTicket';

const router = Router();

router.post(
  '/create-ticket',
  restricted,
  validate(ticketFields),
  async (req: Request, res: Response) => {
    try {
      const ticket = req.body;
      ticket.created_by = req.decoded.id;

      const { created_by, message, status, title } = ticket;

      const { newTicket } = await SupportMethods.createTicket({
        params: { created_by, message, status, title },
      });
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as createTicketRouter };

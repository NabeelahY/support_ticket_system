import { Router, Request, Response } from 'express';
import { SupportMethods } from '../../database/support/support.statics';

const router = Router();

router.post('create-ticket', async (req: Request, res: Response) => {
  try {
    const newTicket = await SupportMethods.createTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


export { router as createTicketRouter };
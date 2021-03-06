import { Router, Request, Response } from 'express';
import { SupportMethods } from '../../database/support/support.statics';
import { restricted } from '../../middlewares/restricted';
import { userIdDoesNotExist } from '../../middlewares/user_id_not_exists';

const router = Router();

router.get(
  '/tickets/user/:userId',
  restricted,
  userIdDoesNotExist,
  async (req: Request, res: Response) => {
    try {
      const tickets = await SupportMethods.getUserTickets({
        userId: req.params.userId,
      });
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as getUserTicketsRouter };

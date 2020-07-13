import { Router, Request, Response } from 'express';
import moment from 'moment';
import { SupportMethods } from '../../database/support/support.statics';
import { restricted } from '../../middlewares/restricted';
import { isSupportAgent } from '../../middlewares/isSupportAgent';

const router = Router();
const dateTime = moment().format('DD-MM-YYYY-hhmmss');

router.get(
  '/export',
  restricted,
  isSupportAgent,
  async (req: Request, res: Response) => {
    try {
      const { csv } = await SupportMethods.exportPastMonthTickets();
      res.header('Content-Type', 'text/csv');
      res.attachment(`${dateTime}.csv`);
      res.status(200).send(csv);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as exportPastTicketsRouter };

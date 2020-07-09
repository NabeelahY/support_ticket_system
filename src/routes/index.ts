import { Router } from 'express';

import { registerRouter } from './user/register';
import { createTicketRouter } from './support/createTicket';

const router = Router();

router.use('/auth', registerRouter);
router.use('/support', createTicketRouter);

export default router

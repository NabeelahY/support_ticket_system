import { Router } from 'express';

import { registerRouter } from './user/register';
import { createTicketRouter } from './support/createTicket';
import { getUserTicketsRouter } from './support/getTicketsByUserId';
import { createCommentRouter } from './comment/createComment';

const router = Router();

router.use('/auth', registerRouter);
router.use('/support', createTicketRouter);
router.use('/support', getUserTicketsRouter);
router.use('/support', createCommentRouter);

export default router;

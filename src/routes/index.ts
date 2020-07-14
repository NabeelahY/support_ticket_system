import { Router } from 'express';

import { registerRouter } from './user/register';
import { deleteUserRouter } from './user/deleteUser';
import { createTicketRouter } from './support/createTicket';
import { getUserTicketsRouter } from './support/getTicketsByUserId';
import { createCommentRouter } from './comment/createComment';
import { updateTicketRouter } from './support/updateTicket';
import { getPastTicketsRouter } from './support/getPastMonthTickets';
import { exportPastTicketsRouter } from './support/exportTicketsCsv';
import { deleteTicketRouter } from './support/deleteTicket';

const router = Router();

router.use('/auth', registerRouter);
router.use('/auth', deleteUserRouter);
router.use('/support', createTicketRouter);
router.use('/support', getUserTicketsRouter);
router.use('/support', createCommentRouter);
router.use('/support', updateTicketRouter);
router.use('/support', getPastTicketsRouter);
router.use('/support', exportPastTicketsRouter);
router.use('/support', deleteTicketRouter);

export default router;

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
import { updateUserRouter } from './user/updateUserStatus';
import { loginRouter } from './user/login';
import { getTicketByIdRouter } from './support/getTicketById';
import { getAllTicketRouter } from './support/getAllTickets';

const router = Router();

router.use('/auth', registerRouter);
router.use('/auth', loginRouter);

router.use('/support', createTicketRouter);
router.use('/support', getUserTicketsRouter);
router.use('/support', createCommentRouter);
router.use('/support', updateTicketRouter);
router.use('/support', getPastTicketsRouter);
router.use('/support', exportPastTicketsRouter);
router.use('/support', deleteTicketRouter);
router.use('/support', getTicketByIdRouter);
router.use('/support', getAllTicketRouter);

router.use('/user', deleteUserRouter);
router.use('/user', updateUserRouter);

export default router;

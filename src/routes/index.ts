import { Router } from 'express';

import { registerRouter } from './user/register';

const router = Router();

router.use('/auth', registerRouter);


export default router

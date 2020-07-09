import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/users/user.statics';
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const { newUser, token } = await UserMethods.register({
    params: { username, email, password },
  });

  res.status(201).json({ user: newUser, token });
});


export {router as registerRouter}
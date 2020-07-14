import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/user/user.statics';

const router = Router();

router.delete('/delete/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const { user } = await UserMethods.deleteUser(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export { router as deleteUserRouter };

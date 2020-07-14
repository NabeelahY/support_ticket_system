import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/user/user.statics';
import { isAdmin } from '../../middlewares/isAdmin';
import { userIdDoesNotExist } from '../../middlewares/user_id_not_exists';
import { restricted } from '../../middlewares/restricted';

const router = Router();

router.delete(
  '/delete/user/:userId',
  restricted,
  userIdDoesNotExist,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      const { user } = await UserMethods.deleteUser(userId);
      res.status(200).json({ deletedUser: user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as deleteUserRouter };

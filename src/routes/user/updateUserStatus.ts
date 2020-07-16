import { Router, Request, Response } from 'express';
import { restricted } from '../../middlewares/restricted';
import validate from '../../middlewares/validate';
import { isAdmin } from '../../middlewares/isAdmin';
import { userIdDoesNotExist } from '../../middlewares/user_id_not_exists';
import { UserMethods } from '../../database/user/user.statics';
import { userStatusFields } from '../../middlewares/validateFields/validateUserStatus';

const router = Router();

router.put(
  '/:userId',
  restricted,
  isAdmin,
  validate(userStatusFields),
  userIdDoesNotExist,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      req.userDetails.isAdmin = req.body.isAdmin;
      req.userDetails.isSupport = req.body.isSupport;
      if (req.body.isAdmin) req.userDetails.isSupport = true;
      const user = await UserMethods.updateUserStatus(userId, req.userDetails);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as updateUserRouter };

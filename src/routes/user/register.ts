import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/user/user.statics';
import validate from '../../middlewares/validate';
import { registerFields } from '../../middlewares/validateFields/validateRegister';
import { emailDoesNotExist } from '../../middlewares/email_not_exist';
import { usernameDoesNotExist } from '../../middlewares/username_not_exist';
const router = Router();

router.post(
  '/register',
  validate(registerFields),
  usernameDoesNotExist,
  emailDoesNotExist,
  async (req: Request, res: Response) => {
    try {
      const { username, email, password, isSupport, isAdmin } = req.body;

      const { newUser, token } = await UserMethods.register({
        params: { username, email, password, isSupport, isAdmin },
      });
      req.headers['Authorization'] = token;

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as registerRouter };

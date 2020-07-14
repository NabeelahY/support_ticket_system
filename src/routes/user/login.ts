import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/user/user.statics';
import validate from '../../middlewares/validate';
import { registerFields } from '../../middlewares/validateFields/validateRegister';
import { emailDoesNotExist } from '../../middlewares/email_not_exist';
import { usernameDoesNotExist } from '../../middlewares/username_not_exist';
const router = Router();

router.post(
  '/login',
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const { user, token } = await UserMethods.login({
        username,
        email,
        password,
      });
      req.headers['Authorization'] = token;

      res.status(200).json({ user: user, token });
    } catch (error) {
        console.log(error.message)
      res.status(500).json({ error: error.message });
    }
  }
);

export { router as loginRouter };

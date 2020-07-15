import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/user/user.statics';
import validate from '../../middlewares/validate';
import { userLoginFields } from '../../middlewares/validateFields/validateLoginFields';
const router = Router();

router.post(
  '/login',
  validate(userLoginFields),
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
      res.status(500).json({ error: error.message });
    }
  }
);

export { router as loginRouter };

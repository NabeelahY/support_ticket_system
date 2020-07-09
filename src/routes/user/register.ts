import { Router, Request, Response } from 'express';
import { UserMethods } from '../../database/users/user.statics';
import validate from '../../middlewares/validate';
import { registerFields } from '../../middlewares/validateRegister';
const router = Router();

router.post(
  '/register',
  validate(registerFields),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const { newUser, token } = await UserMethods.register({
        params: { username, email, password },
      });
      req.headers['Authorization'] = token;

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as registerRouter };

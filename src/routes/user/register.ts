import { Router, Request, Response } from 'express';
import { CustomerMethods } from '../../database/customers/customer.statics';
import validate from '../../middlewares/validate';
import { registerFields } from '../../middlewares/validateRegister';
const router = Router();

router.post(
  '/register',
  validate(registerFields),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const { newUser, token } = await CustomerMethods.register({
        params: { username, email, password },
      });
      delete newUser.password;

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as registerRouter };

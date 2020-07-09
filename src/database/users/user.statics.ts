import brcrypt from 'bcryptjs';
import { JWT } from '../../utils/jwt';
import { UserDocument } from './user.types';
import { UserModel } from './user.model';

interface UserParams {
  params: {
    username: string;
    email: string;
    password: string;
  };
}

export class UserMethods {
  static async register({
    params,
  }: UserParams): Promise<{ newUser: UserDocument; token: string }> {
    let user = params;
    user.password = brcrypt.hashSync(params.password, 12);

    const newUser = new UserModel(user);
    await newUser.save();

    const token = JWT.generateToken({
      id: newUser.id,
      email: newUser.email,
    });

    return { newUser, token };
  }
}

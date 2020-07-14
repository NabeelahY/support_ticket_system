import { JWT } from '../../utils/jwt';
import { User } from './user.types';
import { UserModel } from './user.model';

interface UserParams {
  params: {
    username: string;
    email: string;
    password: string;
    isSupport: boolean;
    isAdmin: boolean;
  };
}

export class UserMethods {
  static async register({
    params,
  }: UserParams): Promise<{ newUser: User; token: string }> {
    let user = params;
    const newUser = new UserModel(user);
    await newUser.save();

    const token = JWT.generateToken({
      id: newUser.id,
      email: newUser.email,
      isSupport: newUser.isSupport,
      isAdmin: newUser.isAdmin,
    });

    return { newUser, token };
  }

  static async deleteUser(id: string): Promise<{ user: any }> {
    const user = await UserModel.findByIdAndRemove({ _id: id });
    return { user };
  }
}

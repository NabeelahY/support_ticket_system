import { JWT } from '../../utils/jwt';
import { User } from './user.types';
import { UserModel } from './user.model';
import bcrypt from 'bcryptjs';

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
      username: user.username,
      isSupport: newUser.isSupport,
      isAdmin: newUser.isAdmin,
    });

    return { newUser, token };
  }

  static async login(userDetails: {
    username?: string;
    email?: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await UserModel.findOne({
      $or: [{ email: userDetails.email }, { username: userDetails.username }],
    });
    if (!user) throw new Error('User does not exist');

    const passwordMatch = bcrypt.compareSync(
      userDetails.password,
      user.password
    );
    if (!passwordMatch)
      throw new Error(
        'Incorrect username or email or password. Please check your credentials and try again.'
      );

    const token = JWT.generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      isSupport: user.isSupport,
      isAdmin: user.isAdmin,
    });

    return { user, token };
  }

  static async updateUserStatus(
    userId: string,
    params: {
      isAdmin?: boolean;
      isSupport?: boolean;
    }
  ): Promise<{ updatedUser: any }> {
    let updatedUser = await UserModel.findByIdAndUpdate(userId, params, {
      new: true,
      runValidators: true,
    });

    return { updatedUser };
  }

  static async deleteUser(id: string): Promise<{ user: any }> {
    const user = await UserModel.findByIdAndRemove({ _id: id });
    return { user };
  }
}

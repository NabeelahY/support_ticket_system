import brcrypt from 'bcryptjs';
import { JWT } from '../../utils/jwt';
import { CustomerDocument } from './customer.types';
import { CustomerModel } from './customer.model';

interface CustomerParams {
  params: {
    username: string;
    email: string;
    password: string;
  };
}

export class CustomerMethods {
  static async register({
    params,
  }: CustomerParams): Promise<{ newUser: CustomerDocument; token: string }> {
    let user = params;
    user.password = brcrypt.hashSync(params.password, 12);

    const newUser = new CustomerModel(user);
    await newUser.save();

    const token = JWT.generateToken({
      id: newUser.id,
      email: newUser.email,
    });

    return { newUser, token };
  }
}

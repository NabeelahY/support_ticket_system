import jwt from 'jsonwebtoken';

import { config } from '../config/config';

export class JWT {
  static generateToken(payload: object): string {
    return jwt.sign(payload, config.JWT_SECRET);
  }
}

import jwt from 'jsonwebtoken';
import moment from 'moment';

import { config } from '../config/config';

export class JWT {
  static generateToken(payload: object): string {
    const expires = moment().add(2, 'days').valueOf();
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: expires });
  }
}

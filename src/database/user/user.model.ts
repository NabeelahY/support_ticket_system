import { model } from 'mongoose';

import { User } from './user.types';
import { UserSchema } from './user.schema';

export const UserModel = model<User>('user', UserSchema);

import { model } from 'mongoose';

import { UserDocument } from './user.types';
import { UserSchema } from './user.schema';

export const UserModel = model<UserDocument>('user', UserSchema);

import { model } from 'mongoose';

import { CustomerDocument } from './customer.types';
import { CustomerSchema } from './customer.schema';

export const CustomerModel = model<CustomerDocument>('user', CustomerSchema);

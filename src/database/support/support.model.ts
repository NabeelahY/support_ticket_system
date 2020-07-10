import { model } from 'mongoose';

import { SupportDocument } from './support.types';
import { SupportSchema } from './support.schema';

export const SupportModel = model<SupportDocument>('support', SupportSchema);

import { model } from 'mongoose';

import { Support } from './support.types';
import { SupportSchema } from './support.schema';

export const SupportModel = model<Support>('support', SupportSchema);

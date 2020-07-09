import { SupportDocument } from './support.types';
import { SupportModel } from './support.model';
interface TicketParams {
  params: {
    created_by: string;
    message: string;
    status: string;
  };
}

export class UserMethods {
  static async createTicket({
    params,
  }: TicketParams): Promise<{ newTicket: SupportDocument }> {
    let newTicket = new SupportModel(params);
    await newTicket.save();

    return { newTicket };
  }
}

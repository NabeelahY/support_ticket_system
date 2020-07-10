import { SupportDocument } from './support.types';
import { SupportModel } from './support.model';
interface TicketParams {
  params: {
    created_by: string;
    message: string;
    status: string;
    title: string;
  };
}

export class SupportMethods {
  static async createTicket({
    params,
  }: TicketParams): Promise<{ newTicket: SupportDocument }> {
    let newTicket = new SupportModel(params);
    await newTicket.save();

    return { newTicket };
  }

  static async getUserTickects({
    userId,
  }: {
    userId: string;
  }): Promise<{ tickets: any }> {
    let tickets = await SupportModel.find({ created_by: userId }).populate(
      'support'
    );

    return { tickets };
  }
}

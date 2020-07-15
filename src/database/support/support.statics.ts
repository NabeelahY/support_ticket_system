import { Support } from './support.types';
import { SupportModel } from './support.model';
import { Parser } from 'json2csv';

interface TicketParams {
  params: {
    created_by: string;
    message: string;
    status: string;
    title: string;
  };
  ticketId?: string;
}

const fields = ['id', 'title', 'message', 'createdAt'];

export class SupportMethods {
  static async createTicket({
    params,
  }: TicketParams): Promise<{ newTicket: Support }> {
    let newTicket = new SupportModel(params);
    await newTicket.save();

    return { newTicket };
  }

  static async getUserTickets({
    userId,
  }: {
    userId: string;
  }): Promise<{ tickets: any }> {
    let tickets = await SupportModel.find({ created_by: userId }).populate(
      'comments'
    );

    return { tickets };
  }

  static async updateTicketStatus(
    ticketId: string,
    params: {
      created_by?: string;
      message?: string;
      status: string;
      title?: string;
    }
  ): Promise<{ updatedTicket: any }> {
    let updatedTicket = await SupportModel.findByIdAndUpdate(ticketId, params, {
      new: true,
      runValidators: true,
    }).populate('comments');

    return { updatedTicket };
  }

  static async getPastMonthTickets(): Promise<{ tickets: any }> {
    const currDate = new Date();
    currDate.setMonth(currDate.getMonth() - 1);

    let tickets = await SupportModel.find({
      createdAt: { $gte: currDate },
      status: 'RESOLVED',
    }).populate('comments');

    return { tickets };
  }

  static async exportPastMonthTickets(): Promise<{ csv: any }> {
    const currDate = new Date();
    currDate.setMonth(currDate.getMonth() - 1);

    let tickets = await SupportModel.find({
      createdAt: { $gte: currDate },
      status: 'RESOLVED',
    });

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(tickets);

    return { csv };
  }

  static async deleteTicket(id: string): Promise<{ ticket: any }> {
    const ticket = await SupportModel.findByIdAndRemove({ _id: id });
    return { ticket };
  }
}

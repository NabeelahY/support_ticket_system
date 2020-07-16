import { UserModel } from '../database/user/user.model';
import { SupportModel } from '../database/support/support.model';

const userId = async () => {
  const [user] = await UserModel.find({ username: 'Name' });

  return user.id;
};

export const seedTickets = async () => {
  try {
    await SupportModel.deleteMany({});
    const id = await userId();
    for (const t of tickets) {
      t.created_by = id;
      const ticket = new SupportModel(t);
      await ticket.save();
    }
    console.log('Tickets seeded 🚀')
  } catch (error) {
    console.log(error);
  }
};

const tickets = [
  { title: 'Ticket title', message: 'Message', created_by: '' },
  { title: 'Ticket title2', message: 'Message2', created_by: '' },
  {
    title: 'Ticket title3',
    message: 'Message3',
    created_by: '',
    status: 'IN-REVIEW',
  },
  {
    title: 'Ticket title4',
    message: 'Message4',
    created_by: '',
    status: 'RESOLVED',
  },
  {
    title: 'Ticket title5',
    message: 'Message5',
    created_by: '',
    status: 'RESOLVED',
    createdAt: '2020-06-15T18:41:11.980Z',
    updatedAt: '2020-06-15T18:41:11.980Z',
  },
  {
    title: 'Ticket title6',
    message: 'Message6',
    created_by: '',
    status: 'RESOLVED',
    createdAt: '2020-06-20T18:41:11.980Z',
    updatedAt: '2020-06-20T18:41:11.980Z',
  },
  {
    title: 'Ticket title7',
    message: 'Message7',
    created_by: '',
    status: 'RESOLVED',
    createdAt: '2020-05-23T18:41:11.980Z',
    updatedAt: '2020-05-23T18:41:11.980Z',
  },
];

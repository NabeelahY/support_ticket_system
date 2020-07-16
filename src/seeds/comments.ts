import { UserModel } from '../database/user/user.model';
import { SupportModel } from '../database/support/support.model';
import { CommentModel } from '../database/comment/comment.model';

const userId = async () => {
  const [user] = await UserModel.find({ username: 'Name' });

  return user.id;
};

const supportUserId = async () => {
  const [user] = await UserModel.find({ username: 'Agent' });

  return user.id;
};

const ticketId = async () => {
  const customerId = await userId();

  const ticket = await SupportModel.findOne({ created_by: customerId });
  return ticket?.id;
};

const updateTicket = async (ticketId: any, newComment: any) => {
  await SupportModel.findByIdAndUpdate(
    ticketId,
    {
      status: 'IN-REVIEW',
      $push: {
        comments: {
          _id: newComment._id,
          created_by: newComment.created_by,
          comment: newComment.comment,
          ticket_id: newComment.ticket_id,
        },
      },
    },
    { new: true, useFindAndModify: false }
  );
};

export const seedComments = async () => {
  try {
    await CommentModel.deleteMany({});
    const id = await supportUserId();
    const tId = await ticketId();
    for (const c of supportComments) {
      c.created_by = id;
      c.ticket_id = tId;
      const comment = new CommentModel(c);
      await comment.save();
      await updateTicket(tId, comment);
    }

    const customerId = await userId();
    for (const c of userComments) {
      c.created_by = customerId;
      c.ticket_id = tId;
      const comment = new CommentModel(c);
      await comment.save();
      await updateTicket(tId, comment);
    }
    console.log('Comments seeded 🚀');
  } catch (error) {
    console.log(error);
  }
};

export const supportComments = [
  { comment: 'Message', created_by: '', ticket_id: '' },
  { comment: 'Message2', created_by: '', ticket_id: '' },
];

export const userComments = [
  { comment: 'Message', created_by: '', ticket_id: '' },
  { comment: 'Message2', created_by: '', ticket_id: '' },
];

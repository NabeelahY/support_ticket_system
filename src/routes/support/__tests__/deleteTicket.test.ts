import supertest from 'supertest';

import server from '../../../api/server';
import { supportUserDetail, createTicketTest } from '../../../tests';
import { generateID } from '../../../utils/generateRandomId';

const request = supertest(server);

describe('[DELETE] Delete Ticket', () => {
  it('Error if token is not in the header', async () => {
    const id = generateID();
    await request.delete(`/api/support/ticket/${id}`).expect(401);
  });

  it('Error if a wrong ticket id is provided', async () => {
    const { token } = await supportUserDetail();
    const id = generateID();

    await request
      .delete(`/api/support/ticket/${id}`)
      .set('Authorization', token)
      .expect(404);
  });

  it('Error if user is not an admin', async () => {
    const { body, token } = await createTicketTest(false);

    await request
      .delete(`/api/support/ticket/${body.id}`)
      .set('Authorization', token)
      .expect(401);
  });

  it('Only an admin can delete a ticket', async () => {
    const { body, token } = await createTicketTest(true);

    const res = await request
      .delete(`/api/support/ticket/${body.id}`)
      .set('Authorization', token)

    expect(res.body).toHaveProperty('deletedTicket');
    expect(res.status).toEqual(200);
  });
});

import supertest from 'supertest';

import server from '../../../api/server';
import { userDetail, createTicketTest } from '../../../tests';
import { generateID } from '../../../utils/generateRandomId';

const request = supertest(server);

describe('[GET] Get Ticket by Id', () => {
  it('Error if ticket id does not exist', async () => {
    const { token } = await userDetail();
    const ticketId = generateID();
    const res = await request
      .get(`/api/support/tickets/${ticketId}`)
      .set('Authorization', token);

    expect(res.status).toEqual(404);
  });

  it('Error if ticket id does not exist and not mongo objectId type', async () => {
    const { token } = await userDetail();
    const res = await request
      .get(`/api/support/tickets/abc`)
      .set('Authorization', token);

    expect(res.status).toEqual(400);
  });

  it('User can get ticket by id', async () => {
    const { body, token } = await createTicketTest(false);
    const res = await request
      .get(`/api/support/tickets/${body.id}`)
      .set('Authorization', token);

    expect(res.status).toEqual(200);
  });
});

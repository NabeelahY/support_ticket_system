import supertest from 'supertest';

import server from '../../../api/server';
import { createTicketTest } from '../../../tests';

const request = supertest(server);

describe('[GET] Get Past Month Ticket', () => {
  it('Error if token is not in the header', async () => {
    await request.get(`/api/support/ticket/past-month`).expect(401);
  });

  it('Error if logged user is not a support agent', async () => {
    const { token } = await createTicketTest(false);
    await request
      .get(`/api/support/ticket/past-month`)
      .set('Authorization', token)
      .expect(401);
  });

  it('Support agent get resolved tickets', async () => {
    const { token } = await createTicketTest(true);
    await request
      .get(`/api/support/ticket/past-month`)
      .set('Authorization', token)
      .expect(200);
  });
  it('Support agent get resolved tickets', async () => {
    const { token } = await createTicketTest(true);
    await request
      .get(`/api/support/export`)
      .set('Authorization', token)
      .expect(200);
  });
});

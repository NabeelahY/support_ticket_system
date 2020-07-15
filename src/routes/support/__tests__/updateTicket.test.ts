import supertest from 'supertest';

import server from '../../../api/server';
import { createTicketTest } from '../../../tests';
import { generateID } from '../../../utils/generateRandomId';

const request = supertest(server);

describe('[PUT] Update Ticket Status', () => {
  it('Error if token is not in the header', async () => {
    const { body } = await createTicketTest(false);
    await request
      .put(`/api/support/tickets/${body.id}`)
      .send({ status: 'OPEN' })
      .expect(401);
  });

  it('Error if invalid ticket id is in params', async () => {
    const { token } = await createTicketTest(true);
    const randomId = generateID();
    await request
      .put(`/api/support/tickets/${randomId}`)
      .set('Authorization', token)
      .send({ status: 'OPEN' })
      .expect(404);
  });

  it('Error if logged user is not a support agent', async () => {
    const { body, token } = await createTicketTest(false);
    await request
      .put(`/api/support/tickets/${body.id}`)
      .set('Authorization', token)
      .send({ status: 'OPEN' })
      .expect(401);
  });
  it("Error if status option is not 'OPEN', 'IN-REVIEW', 'RESOLVED'", async () => {
    const { body, token } = await createTicketTest(true);
    await request
      .put(`/api/support/tickets/${body.id}`)
      .set('Authorization', token)
      .send({ status: 'REVIEWED' })
      .expect(422);
  });

  it('Support agent can update ticket status', async () => {
    const { body, token } = await createTicketTest(true);
    await request
      .put(`/api/support/tickets/${body.id}`)
      .set('Authorization', token)
      .send({ status: 'IN-REVIEW' })
      .expect(200);
  });
});

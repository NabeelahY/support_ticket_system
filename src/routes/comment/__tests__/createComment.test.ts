import supertest from 'supertest';

import server from '../../../api/server';
import { createTicketTest, userDetail, generateID } from '../../../tests';

const request = supertest(server);

describe('[POST] Create Comments for Ticket', () => {
  it('Error if token is not in the header', async () => {
    const { body } = await createTicketTest(false);
    await request
      .post(`/api/support/ticket/${body.id}/comment`)
      .send({ comment: 'Comment' })
      .expect(401);
  });

  it('Error if user is not a support agent', async () => {
    const { body, token } = await createTicketTest(false);
    await request
      .post(`/api/support/ticket/${body.id}/comment`)
      .set('Authorization', token)
      .send({ comment: 'Comment' })
      .expect(400);
  });

  it('Error if ticket id does not exist', async () => {
    const { token } = await createTicketTest(false);
    const randomId = generateID();
    await request
      .post(`/api/support/ticket/${randomId}/comment`)
      .set('Authorization', token)
      .send({ comment: 'Comment' })
      .expect(404);
  });

  it('User can create a comment if they are a support agent', async () => {
    const { body, token } = await createTicketTest(true);

    await request
      .post(`/api/support/ticket/${body.id}/comment`)
      .set('Authorization', token)
      .send({ comment: 'Comment' })
      .expect(201);
  });
});

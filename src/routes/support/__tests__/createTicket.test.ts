import supertest from 'supertest';

import server from '../../../api/server';
import { userTest } from '../../../tests';

const request = supertest(server);

describe('[POST] Create Ticket', () => {
  it('Error if token is not in the header', async () => {
    await request
      .post('/api/support/create-ticket')
      .send({ title: 'Ticket title', message: 'Message' })
      .expect(401);
  });

  it('Error if fields do not pass validation', async () => {
    const token = await userTest();
    await request
      .post('/api/support/create-ticket')
      .set('Authorization', token)
      .send({ title: 'Ticket title', message: '' })
      .expect(422);

    const res = await request
      .post('/api/support/create-ticket')
      .set('Authorization', token)
      .send({ title: '', message: '' })
      .expect(422);

    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors).toHaveLength(2);
  });

  it('User can create ticket with correct fields and token on header', async () => {
    const token = await userTest();
    const res = await request
      .post('/api/support/create-ticket')
      .set('Authorization', token)
      .send({ title: 'Ticket title', message: 'Message' });

    expect(res.body).toHaveProperty('status', 'OPEN');
    expect(res.status).toEqual(201);
  });
});

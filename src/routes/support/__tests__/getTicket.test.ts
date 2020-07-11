import supertest from 'supertest';

import server from '../../../api/server';
import { userDetail, generateID } from '../../../tests';

const request = supertest(server);

describe('[GET] Get Ticket by userId', () => {
  it('Error if user id does not exist', async () => {
    const { token } = await userDetail();
    const userId = generateID();
    const res = await request
      .get(`/api/support/tickets/${userId}`)
      .set('Authorization', token);

    expect(res.status).toEqual(404);
  });

  it('Error if user id does not exist and not mongo objectId type', async () => {
    const { token } = await userDetail();
    const res = await request
      .get(`/api/support/tickets/abc`)
      .set('Authorization', token);

    expect(res.status).toEqual(400);
  });

  it('User can get previous tickets', async () => {
    const { token, user } = await userDetail();
    const res = await request
      .get(`/api/support/tickets/${user.id}`)
      .set('Authorization', token);

    expect(res.status).toEqual(200);
  });
});

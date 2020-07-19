import supertest from 'supertest';

import server from '../../../api/server';
import { userDetail, supportUserDetail } from '../../../tests';

const request = supertest(server);

describe('[GET] Get All Tickets', () => {
  it('Error if logged user is not an admin', async () => {
    const { token } = await userDetail();
    const res = await request
      .get(`/api/support/all/tickets`)
      .set('Authorization', token);

    expect(res.status).toEqual(401);
  });

  it('Admin can get all tickets', async () => {
    const { token } = await supportUserDetail();
    const res = await request
      .get(`/api/support/all/tickets`)
      .set('Authorization', token);

    expect(res.status).toEqual(200);
  });
});

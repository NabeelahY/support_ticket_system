import supertest from 'supertest';

import server from '../../../api/server';
import { userDetail, supportUserDetail } from '../../../tests';
import { generateID } from '../../../utils/generateRandomId';

const request = supertest(server);

describe('[PUT] Update User Status', () => {
  it('Error if token is not in the header', async () => {
    const { user } = await userDetail();
    await request
      .put(`/api/user/${user.id}`)
      .send({ status: 'OPEN' })
      .expect(401);
  });

  it('Error if invalid user id is in params', async () => {
    const { token } = await supportUserDetail();
    const randomId = generateID();
    await request
      .put(`/api/user/${randomId}`)
      .set('Authorization', token)
      .send({ status: 'OPEN' })
      .expect(404);
  });

  it('Error if logged user is not an admin', async () => {
    const { user, token } = await userDetail();
    await request
      .put(`/api/user/${user.id}`)
      .set('Authorization', token)
      .send({ isAdmin: true })
      .expect(401);
  });
  it('Error if option is not a boolean', async () => {
    const { user, token } = await supportUserDetail();
    await request
      .put(`/api/user/${user.id}`)
      .set('Authorization', token)
      .send({ isAdmin: 'no' })
      .expect(422);
  });

  it('Admin can update user status', async () => {
    const admin = await supportUserDetail();
    const user = await userDetail();
    await request
      .put(`/api/user/${user.user.id}`)
      .set('Authorization', admin.token)
      .send({ isAdmin: true })
      .expect(200);
  });
});

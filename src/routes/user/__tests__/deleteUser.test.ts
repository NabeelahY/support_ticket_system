import supertest from 'supertest';

import server from '../../../api/server';
import { supportUserDetail, userDetail } from '../../../tests';
import { generateID } from '../../../utils/generateRandomId';

const request = supertest(server);

describe('[DELETE] Delete User', () => {
  it('Error if token is not in the header', async () => {
    const id = generateID();
    await request.delete(`/api/user/delete/${id}`).expect(401);
  });

  it('Error if a wrong user id is provided', async () => {
    const { token } = await supportUserDetail();
    const id = generateID();

    await request
      .delete(`/api/user/delete/${id}`)
      .set('Authorization', token)
      .expect(404);
  });

  it('Error if user is not an admin', async () => {
    const { token, user } = await userDetail();

    await request
      .delete(`/api/user/delete/${user.id}`)
      .set('Authorization', token)
      .expect(401);
  });

  it('Only an admin can delete a user', async () => {
    const { token } = await supportUserDetail();
    const { user } = await userDetail();

    const res = await request
      .delete(`/api/user/delete/${user.id}`)
      .set('Authorization', token);

    expect(res.body).toHaveProperty('deletedUser');
    expect(res.status).toEqual(200);
  });
});

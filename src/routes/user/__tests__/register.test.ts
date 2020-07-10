import supertest from 'supertest';

import server from '../../../api/server';
import { UserModel } from '../../../database/users/user.model';

const request = supertest(server);

describe('[POST] Register New User', () => {
  it('Error if fields do not pass validation', async () => {
    await request
      .post('/api/auth/register')
      .send({ username: 'Name', email: '' })
      .expect(422);
    await request
      .post('/api/auth/register')
      .send({ username: '', email: 'name@email.com' })
      .expect(422);

    const res = await request
      .post('/api/auth/register')
      .send({ username: '', email: '' })
      .expect(422);

    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors).toHaveLength(4);
  });

  it('[POST] Users are able to register', async () => {
    const res = await request
      .post('/api/auth/register')
      .send({ username: 'Name', email: 'name@email.com', password: '12345678' })
      .expect(201);

    expect(res.body).toHaveProperty('user');
    expect(res.body).not.toHaveProperty('password');
  });
});

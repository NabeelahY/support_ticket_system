import supertest from 'supertest';

import server from '../../../api/server';
import { userDetail } from '../../../tests';

const request = supertest(server);

describe('[POST] User Login', () => {
  it('Error if fields do not pass validation', async () => {
    await request
      .post('/api/auth/login')
      .send({ username: 'Name', password: '' })
      .expect(422);
    await request
      .post('/api/auth/login')
      .send({ email: '', password: '12345' })
      .expect(422);

    const res = await request
      .post('/api/auth/login')
      .send({ username: '', email: '' })
      .expect(422);

    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors).toHaveLength(4);
  });

  it('Error if user is not registered', async () => {
    await userDetail();
    const res = await request
      .post('/api/auth/login')
      .send({ username: 'Name', password: '1234567' })
      .expect(500);

    expect(res.body).toHaveProperty('error');
  });

  it('[POST] Users are able to login', async () => {
    await userDetail();
    const res = await request
      .post('/api/auth/login')
      .send({ username: 'User', password: '1234567' })
      .expect(200);

    expect(res.body).toHaveProperty('user');
    expect(res.body).not.toHaveProperty('password');
  });
});

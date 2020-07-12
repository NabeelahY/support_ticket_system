import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

describe('SERVER', () => {
  it('Server is up', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Server is up!');
  });

  it('Error for wrong route', async () => {
    const res = await request.get('/abc');
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('Route does not exist');
  });
});

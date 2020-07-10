import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../api/server';

let mongo: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  process.env.DATABASE_URL = mongoUri;

  await mongoose.connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  jest.setTimeout(50000);

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

const request = supertest(server);

export const userDetail = async () => {
  const res = await request
    .post('/api/auth/register')
    .send({ username: 'User', email: 'user@email.com', password: '1234567' });

  const { token, user } = res.body;

  return { token, user };
};

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import appRouter from '../routes';

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.status(200).send({ message: 'Server is up!' });
});

server.use('/api', appRouter);

server.all('*', (req, res) => {
  res.status(404).send({ message: 'Route does not exist' });
});

export default server;

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send('Server is up!');
});

server.all('*', (req, res) => {
  res.send('Route does not exist');
});

export default server;

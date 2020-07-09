import express from 'express';
import { connect } from './database/database';
import { config } from './config/config';

const server = express();

connect();

server.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});

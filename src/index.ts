import server from '../src/api/server';
import { connect } from './database/database';
import { config } from './config/config';

connect();

server.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});

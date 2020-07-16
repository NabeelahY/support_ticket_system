import { seedUsers } from './users';
import { seedTickets } from './ticket';
import { connect, disconnect } from '../database/database';
import { seedComments } from './comments';

(async () => {
  await connect();
  await seedUsers();
  await seedTickets();
  await seedComments();
  console.log('Seed successful');
  disconnect();
})();

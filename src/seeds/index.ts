import { seedUsers } from './users';
import { seedTickets } from './ticket';
import { connect, disconnect } from '../database/database';

(async () => {
  await connect();
  await seedUsers();
  await seedTickets();
  console.log('Seed successful');
  disconnect();
})();

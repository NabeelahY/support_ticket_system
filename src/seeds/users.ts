import { UserModel } from '../database/user/user.model';

export const seedUsers = async () => {
  try {
    await UserModel.deleteMany({});
    for (const u of users) {
      const user = new UserModel(u);
      await user.save();
    }
    console.log('Users seeded 🚀');
  } catch (error) {
    console.log(error);
  }
};

const users = [
  {
    username: 'Name',
    email: 'name@email.com',
    password: '12345678',
    isSupport: false,
  },
  {
    username: 'Agent',
    email: 'agent@email.com',
    password: '12345678',
    isSupport: true,
  },
  {
    username: 'Admin',
    email: 'admin@email.com',
    password: '12345678',
    isSupport: true,
    isAdmin: true,
  },
];

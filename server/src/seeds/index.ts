import { seedUsers } from './user-seeds.js';

const runSeeds = async () => {
  try {
    await seedUsers();
    console.log('All seeds completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
};

runSeeds();

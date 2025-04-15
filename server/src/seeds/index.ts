import { seedUsers } from './user-seeds.js';
import { deleteTestUser } from './delete-test-user.js';

const runSeeds = async () => {
  try {
    // First delete the test user if it exists
    await deleteTestUser();
    
    // Then create a new test user
    await seedUsers();
    console.log('All seeds completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
};

runSeeds();

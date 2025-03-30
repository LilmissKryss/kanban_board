import sequelize from '../config/database.js';
import { QueryInterface } from 'sequelize';

interface Migration {
  up: (queryInterface: QueryInterface) => Promise<void>;
  down: (queryInterface: QueryInterface) => Promise<void>;
}

const runMigrations = async () => {
  const queryInterface = sequelize.getQueryInterface() as QueryInterface;
  
  // Create Users table
  const createUsers = (await import('./20240320000000-create-users.js')).default as Migration;
  await createUsers.up(queryInterface);
  
  // Create Boards table
  const createBoards = (await import('./20240320000001-create-boards.js')).default as Migration;
  await createBoards.up(queryInterface);
  
  // Create Columns table
  const createColumns = (await import('./20240320000002-create-columns.js')).default as Migration;
  await createColumns.up(queryInterface);
  
  // Create Tickets table
  const createTickets = (await import('./20240320000003-create-tickets.js')).default as Migration;
  await createTickets.up(queryInterface);
  
  console.log('All migrations completed successfully');
};

runMigrations().catch(console.error); 
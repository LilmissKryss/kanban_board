import sequelize from '../config/database.js';
import { User, Board, Column, Ticket } from '../models/index.js';

const seedDatabase = async () => {
  try {
    
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Create test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    // Create test board
    const board = await Board.create({
      name: 'Test Board',
      description: 'A test kanban board',
      userId: user.id
    });

    // Create test columns
    const columns = await Promise.all([
      Column.create({
        name: 'To Do',
        position: 0,
        boardId: board.id
      }),
      Column.create({
        name: 'In Progress',
        position: 1,
        boardId: board.id
      }),
      Column.create({
        name: 'Done',
        position: 2,
        boardId: board.id
      })
    ]);

    // Create test tickets
    await Promise.all([
      Ticket.create({
        title: 'First Task',
        description: 'This is the first test task',
        status: 'todo',
        userId: user.id,
        columnId: columns[0].id
      }),
      Ticket.create({
        title: 'Second Task',
        description: 'This is the second test task',
        status: 'inprogress',
        userId: user.id,
        columnId: columns[1].id
      }),
      Ticket.create({
        title: 'Third Task',
        description: 'This is the third test task',
        status: 'done',
        userId: user.id,
        columnId: columns[2].id
      })
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

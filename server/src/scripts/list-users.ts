import { User } from '../models/user.js';
import sequelize from '../config/database.js';

const listUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    
    const users = await User.findAll();
    console.log('Users in database:');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Username: ${user.username}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error listing users:', error);
    process.exit(1);
  }
};

listUsers();

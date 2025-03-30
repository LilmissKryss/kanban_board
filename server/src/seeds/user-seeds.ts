import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
    });

    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}; 
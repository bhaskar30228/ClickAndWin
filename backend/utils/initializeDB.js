// utils/initializeDB.js
import {User} from '../model/User.js'; // Assuming you have a User model defined

const sampleUsers = [
  'Rahul',
  'Kamal',
  'Sanak',
  'Priya',
  'Amit',
  'Neha',
  'Vikram',
  'Sonia',
  'Ravi',
  'Kiran'
];

export default async function initializeDatabase() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany(sampleUsers.map(name => ({ name })));
      console.log('Database initialized with sample users');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}


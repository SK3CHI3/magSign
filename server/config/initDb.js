const mongoose = require('mongoose');
const User = require('../models/user');

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // Get the users collection
    const usersCollection = mongoose.connection.collection('users');

    // Drop existing indexes
    console.log('Dropping existing indexes...');
    await usersCollection.dropIndexes();
    console.log('Existing indexes dropped successfully');

    // Create new index on username
    console.log('Creating username index...');
    await usersCollection.createIndex(
      { username: 1 }, 
      { 
        unique: true,
        background: true 
      }
    );
    console.log('Username index created successfully');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
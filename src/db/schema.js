import { Sequelize } from 'sequelize';

export async function initializeSchema(sequelize) {
  try {
    // Create schema if it doesn't exist
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');

    // Create users table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Schema and users table initialized successfully');
  } catch (error) {
    console.error('Error initializing schema:', error);
    throw error;
  }
}
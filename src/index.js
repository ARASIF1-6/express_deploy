import express from 'express';
import { Sequelize } from 'sequelize';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import { initializeSchema } from './db/schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Initialize schema and test DB connection
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await initializeSchema(sequelize); // Initialize schema and table
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
}

initializeDatabase();

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.handler = serverless(app);
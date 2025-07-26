import express from 'express';
import UserController from '../controllers/userController.js';
import UserService from '../services/userService.js';
import UserRepository from '../repositories/userRepository.js';
import { Sequelize } from 'sequelize';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize dependencies
const sequelize = new Sequelize(process.env.DATABASE_URL);
const userModel = User(sequelize);
const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
router.post('/register', (req, res) => userController.register(req, res));
router.get('/', (req, res) => userController.getAll(req, res));

// Sync Sequelize model with database
await sequelize.sync();

export default router;
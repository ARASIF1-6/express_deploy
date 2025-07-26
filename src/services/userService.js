import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/userRepository.js';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const { email, password } = userData;

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    return await this.userRepository.create({
      email,
      password: hashedPassword
    });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
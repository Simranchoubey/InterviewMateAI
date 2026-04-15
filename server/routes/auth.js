import express from 'express';
const router = express.Router();
import { signup, login } from '../controllers/authController.js';

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

export default router;
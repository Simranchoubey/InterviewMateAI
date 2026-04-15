import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { getHistory } from '../controllers/userController.js';

router.get('/history', auth, getHistory);

export default router;
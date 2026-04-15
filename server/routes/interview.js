import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { startInterview, submitAnswer, getResult } from '../controllers/interviewController.js';

router.post('/start', auth, startInterview);

router.post('/answer', auth, submitAnswer);

router.get('/result', auth, getResult);

export default router;
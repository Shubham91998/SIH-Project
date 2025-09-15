import { Router } from 'express';
const router = Router();
import { healthCheck, getStats } from '../controllers/Healthcontroller.js';

// Health check endpoint
router.get('/', healthCheck);

// Get statistics
router.get('/stats', getStats);

export default router;
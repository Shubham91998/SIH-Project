import { Router } from 'express';
const router = Router();
import { getUserSessions, getSession, renameSession, deleteSession, exportSession } from '../controllers/SessionController.js';

// Get all sessions for a user
router.get('/', getUserSessions);

// Get specific session
router.get('/:sessionId', getSession);

// Rename session
router.patch('/:sessionId/rename', renameSession);

// Delete session (soft delete)
router.delete('/:sessionId', deleteSession);

// Export session data
router.get('/:sessionId/export', exportSession);

export default router;
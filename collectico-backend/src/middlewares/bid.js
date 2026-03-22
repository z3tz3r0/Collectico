import express from 'express';
import { getBidsByProduct } from '../controller/bidController.js';
import { authUser } from './authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/:productId', getBidsByProduct);

export default router;
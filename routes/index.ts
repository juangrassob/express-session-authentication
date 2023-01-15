import express, { Request, Response, NextFunction } from 'express';
import authenticate from '../middlewares/authenticate';
import authController from '../controllers/auth';

const router = express.Router();

router.get('/public', (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { message: 'Public route' } });
});

router.post('/login', authController.login);

router.get('/private', authenticate, (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { ...req.session } });
});

export default router;

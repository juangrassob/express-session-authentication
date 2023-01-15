import { Request, Response, NextFunction } from 'express';

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session || !req.session.clientId) {
    return res.status(401).json({
      success: false,
      error: 'You must be logged in to access this route',
    });
  }
  next();
}

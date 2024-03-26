import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const loginValidationMiddleware = [
  body('email').notEmpty().withMessage('Email is required').isEmail(),
  body('password').notEmpty().withMessage('Password is required').isString(),
];

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

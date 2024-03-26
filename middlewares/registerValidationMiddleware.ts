import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const registerValidationMiddleware = [
  body('fname').notEmpty().withMessage('First name is required').isString(),
  body('lname').notEmpty().withMessage('Last name is required').isString(),
  body('email').notEmpty().withMessage('Email is required').isEmail(),
  body('password').notEmpty().withMessage('Password is required').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('userType').notEmpty().withMessage('User type is required').isString(),
];

export function validateRegister(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

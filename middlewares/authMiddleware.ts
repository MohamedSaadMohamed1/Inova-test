import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 

interface CustomRequest extends Request {
  userId?: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'AuthHeader not provided' });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!) as { userId: string };

    if (!decoded.userId) {
      return res.status(401).json({ error: 'Invalid token. Missing user ID' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid token. Token verification failed' });
  }
};

export default verifyToken;

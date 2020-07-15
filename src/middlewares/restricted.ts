import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface TokenType {
  id: string;
  email: string;
  iat: number;
  isSupport: boolean;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      decoded: TokenType;
    }
  }
}

export const restricted = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization');
  if (token) {
    try {
      const verifyToken = jwt.verify(token, config.JWT_SECRET) as TokenType;
      req.decoded = verifyToken;
      next();
    } catch (error) {
      return res.status(401).json(error);
    }
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
};

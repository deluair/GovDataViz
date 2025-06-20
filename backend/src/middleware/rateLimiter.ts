import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter for development
class SimpleRateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>();
  private maxRequests = 100;
  private windowMs = 60000; // 1 minute

  consume(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const now = Date.now();
      const userRequests = this.requests.get(key);

      if (!userRequests || now > userRequests.resetTime) {
        this.requests.set(key, { count: 1, resetTime: now + this.windowMs });
        resolve();
        return;
      }

      if (userRequests.count >= this.maxRequests) {
        const msBeforeNext = userRequests.resetTime - now;
        reject({ msBeforeNext });
        return;
      }

      userRequests.count++;
      resolve();
    });
  }
}

export const rateLimiter = new SimpleRateLimiter();

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.ip || 'unknown';
    await rateLimiter.consume(key);
    next();
  } catch (rejRes: any) {
    const msBeforeNext = rejRes?.msBeforeNext || 60000;

    res.status(429).json({
      success: false,
      error: 'Too many requests',
      retryAfter: Math.round(msBeforeNext / 1000),
      timestamp: new Date().toISOString()
    });
  }
};

 
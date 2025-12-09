import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, body, headers } = req;
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} - ${duration}ms`);
        });

        next();
    }
}
import compression from 'compression';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../decorators/Middleware.decorator';

@Middleware({ type: 'before' })
export class CompressionMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction): any  {
        return compression()(req, res, next);
    }
}

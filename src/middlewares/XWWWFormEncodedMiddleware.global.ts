import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Middleware } from '../decorators/Middleware.decorator';

@Middleware({ type: 'before' })
export class XWWWFormEncodedMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction): any {
        return bodyParser.urlencoded()(req, res, next);
    }
}

import { applyDecorators } from '../lib/ApplyDecorators';
import { Service } from 'typedi';
import { Middleware as MiddlewareDecorator } from 'routing-controllers';

export function Middleware(options: {
    type: 'after' | 'before';
    priority?: number;
}) {
    return applyDecorators(
        MiddlewareDecorator(options) as any,
        Service() as any
    );
}

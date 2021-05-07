import { applyDecorators } from '../lib/ApplyDecorators';
import { JsonController } from 'routing-controllers';
import { ControllerOptions } from 'routing-controllers/types/decorator-options/ControllerOptions';
import { Service } from 'typedi';

/*
 * Combines JsonController and Service decorator
 * to create controller, which is also added into IoC Container,
 * without making noise in Controllers
 * */
export function Controller(baseRoute?: string, options?: ControllerOptions) {
    return applyDecorators(
        JsonController(baseRoute, options),
        Service() as any
    );
}

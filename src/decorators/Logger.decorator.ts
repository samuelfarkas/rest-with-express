import { Container } from 'typedi';

import WinstonLog from '../lib/Logger';

export function Logger(scope: string): ParameterDecorator {
    return (object, propertyKey, index): any => {
        const logger = new WinstonLog(scope);
        const propertyName = propertyKey ? propertyKey.toString() : '';
        Container.registerHandler({
            object: object as any,
            propertyName,
            index,
            value: () => logger,
        });
    };
}

export { LoggerInterface } from '../lib/Logger';
export default Logger;

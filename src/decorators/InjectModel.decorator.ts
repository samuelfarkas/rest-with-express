import { Container } from 'typedi';
import Connection from '../database/Connection';
import { Model } from 'sequelize-typescript';

export function InjectModelDecorator(model: typeof Model) {
    return function (object: any, propertyName: string, index?: number) {
        Container.registerHandler({
            object,
            propertyName,
            index,
            value: (container) => {
                return container
                    .get<Connection>('database')
                    .connection.getRepository(
                        (model as unknown) as new () => Model
                    );
            },
        });
    };
}

import { Container } from 'typedi';
import DBConnection from '../database/DBConnection';
import { Model } from 'sequelize-typescript';

export function InjectModel(model: typeof Model) {
    return function (object: any, propertyName: string, index?: number) {
        Container.registerHandler({
            object,
            propertyName,
            index,
            value: (container) => {
                return container
                    .get<DBConnection>('database')
                    .connection.getRepository(
                        (model as unknown) as new () => Model
                    );
            },
        });
    };
}

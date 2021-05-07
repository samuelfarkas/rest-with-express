import { Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import environment from '../environment';
import { Dialect } from 'sequelize/types';

@Service()
class DBConnection {
    private readonly interface: Sequelize;

    constructor() {
        this.interface = new Sequelize({
            host: environment.db.host,
            port: parseInt(environment.db.port),
            database: environment.db.database,
            dialect: environment.db.dialect as Dialect,
            username: environment.db.user,
            password: environment.db.password,
            models: [path.join(__dirname, '../models/*.ts')],
            query: {
                // OPTIONAL
                raw: true,
            },
        });
        this.interface.sync().then(() => console.log('DB Synced.'));
    }

    get connection() {
        return this.interface;
    }
}

export default DBConnection;

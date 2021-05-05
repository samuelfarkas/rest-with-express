import { Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

@Service()
class Connection {
    private readonly interface: Sequelize;

    constructor() {
        this.interface = new Sequelize({
            database: 'test_db',
            dialect: 'sqlite',
            username: 'root',
            password: '',
            storage: ':memory:',
            models: [path.join(__dirname, '../models/*.js')],
        });
        this.interface.sync().then(() => console.log('DB Synced.'));
    }

    get connection() {
        return this.interface;
    }
}

export default Connection;

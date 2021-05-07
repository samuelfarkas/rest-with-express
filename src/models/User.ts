import {
    BeforeCreate,
    Column,
    DefaultScope,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@DefaultScope(() => ({
    attributes: ['id', 'username', 'email', 'password'],
}))
@Table
export class User extends Model {
    @Unique
    @Column
    username: string;

    @Unique
    @Column
    email: string;

    @Column
    password: string;

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }
}

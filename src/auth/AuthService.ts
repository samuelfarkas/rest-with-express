import { Op } from 'sequelize';
import { Service } from 'typedi';
import { InjectModel } from '../decorators/InjectModel.decorator';
import { User } from '../models/User';

@Service()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async findOne(user: Partial<User>) {
        return this.userModel.findOne({
            where: {
                [Op.or]: [
                    { username: user.username || '' },
                    { email: user.email || '' },
                ],
            },
        });
    }

    async create(user: Partial<User>) {
        return this.userModel.create(user);
    }
}

import { Controller } from '../decorators/Controller.decorator';
import { Body, Post } from 'routing-controllers';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from './AuthService';
import {
    EmailAlreadyExists,
    UsernameAlreadyExists,
    UserNotFound,
} from '../errors';
import { WrongPassword } from '../errors/WrongPassword';
import environment from '../environment';
import { omit } from 'lodash';

class BaseUser {
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;
}

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(@Body() credentials: Omit<BaseUser, 'email'>) {
        const user = await this.authService.findOne(credentials);

        if (!user) throw new UserNotFound();

        const validPass = bcrypt.compare(credentials.password, user.password);
        if (!validPass) throw new WrongPassword();

        const body = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        return {
            token: jwt.sign({ user: body }, environment.app.secret),
        };
    }

    @Post('/signup')
    async signUp(@Body() user: BaseUser) {
        const canSignUp = await this.authService.findOne(user);
        if (canSignUp) {
            if (canSignUp.username === user.username)
                throw new UsernameAlreadyExists();
            if (canSignUp.email === user.email) throw new EmailAlreadyExists();
        }
        const newUser = await this.authService.create(user);
        return omit(newUser.get({ plain: true }), [
            'password',
            'createdAt',
            'updateAt',
        ]);
    }
}

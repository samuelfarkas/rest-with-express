import { HttpError } from 'routing-controllers';
import { StatusCodes } from 'http-status-codes';

export class UsernameAlreadyExists extends HttpError {
    constructor() {
        super(StatusCodes.CONFLICT, 'User with this username already exists');
    }
}

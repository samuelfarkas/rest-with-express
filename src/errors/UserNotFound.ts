import { HttpError } from 'routing-controllers';
import { StatusCodes } from 'http-status-codes';

export class UserNotFound extends HttpError {
    constructor() {
        super(StatusCodes.NOT_FOUND, 'User not found');
    }
}

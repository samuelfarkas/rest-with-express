import { HttpError } from 'routing-controllers';
import { StatusCodes } from 'http-status-codes';

export class EmailAlreadyExists extends HttpError {
    constructor() {
        super(StatusCodes.CONFLICT, 'User with this email already exists');
    }
}

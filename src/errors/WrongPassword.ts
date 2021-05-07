import { StatusCodes } from 'http-status-codes';
import { HttpError } from 'routing-controllers';

export class WrongPassword extends HttpError {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, 'Password does not match.');
    }
}

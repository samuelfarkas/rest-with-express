import { Service } from 'typedi';
import { InjectModelDecorator } from '../decorators/InjectModel.decorator';
import { Example } from '../models/Example';

@Service()
export class ExampleService {
    constructor(
        @InjectModelDecorator(Example)
        private readonly exampleModel: typeof Example
    ) {}

    async test() {
        return this.exampleModel.findAll();
    }
}

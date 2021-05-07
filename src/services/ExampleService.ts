import { Service } from 'typedi';
import { Example } from '../models/Example';
import { InjectModel } from '../decorators/InjectModel.decorator';

@Service()
export class ExampleService {
    constructor(
        @InjectModel(Example)
        private readonly exampleModel: typeof Example
    ) {}

    async test(): Promise<Example[]> {
        return this.exampleModel.findAll();
    }
}

import { Get, JsonController } from 'routing-controllers';
import { ExampleService } from '../services/ExampleService';
import { Service } from 'typedi';

@Service()
@JsonController('/example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    @Get('/')
    async getExample() {
        return this.exampleService.test();
    }
}

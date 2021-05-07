import { Controller, Get } from 'routing-controllers';
import { ExampleService } from '../services/ExampleService';
import { Example } from '../models/Example';

@Controller()
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    @Get('/')
    async getExample(): Promise<Example[]> {
        return this.exampleService.test();
    }
}

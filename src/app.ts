import 'reflect-metadata';

import {
    createExpressServer,
    useContainer as setRoutingControllersContainer,
} from 'routing-controllers';
import { useContainer as setClassValidatorContainer } from 'class-validator';
import { Container } from 'typedi';
import { Application } from 'express';
import Connection from './database/Connection';
import { ExampleController } from './controllers/ExampleController';

const DB = new Connection();

/*
 * Setup Express App
 * */
const app: Application = createExpressServer({
    cors: true, // CORS
    classTransformer: true, // class-transformer package to create class instances from plain data
    defaultErrorHandler: false,

    /* API HANDLERS */
    controllers: [ExampleController],
});

/*
 * Setup IoC Container
 * */
Container.set('database', DB);
setClassValidatorContainer(Container);
setRoutingControllersContainer(Container);

app.listen(4000);

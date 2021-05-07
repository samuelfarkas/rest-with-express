import 'reflect-metadata';

import {
    createExpressServer,
    useContainer as setRoutingControllersContainer,
} from 'routing-controllers';
import path from 'path';
import { Container } from 'typedi';
import { Application } from 'express';
import { configure, format, transports } from 'winston';
import environment from './environment';
import DBConnection from './database/DBConnection';

/*
 * Setup IoC Container
 * */
const DB = new DBConnection();
Container.set('database', DB);
setRoutingControllersContainer(Container);

/*
 * Setup winston logger
 * */
configure({
    transports: [
        new transports.Console({
            level: environment.log.level,
            handleExceptions: true,
            format:
                environment.node !== 'development'
                    ? format.combine(format.json())
                    : format.combine(format.colorize(), format.simple()),
        }),
    ],
});
/*
 * Setup Express App
 * */
const app: Application = createExpressServer({
    cors: true, // CORS
    classTransformer: true, // class-transformer package to create class instances from plain data
    defaultErrorHandler: true,

    /* API HANDLERS */
    controllers: [
        path.join(__dirname, './controllers/*Controller.ts'),
        path.join(__dirname, './auth/AuthController.ts'),
    ],
    middlewares: [path.join(__dirname, './middlewares/*Middleware.global.ts')],
    interceptors: [path.join(__dirname, './interceptors/*Interceptor.ts')],
});

// Run app
app.listen(80);

/*
* Logger
* Yoinked from: https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/lib/logger/Logger.ts
* */

import path from 'path';
import winston from 'winston';

export interface LoggerInterface {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}

export class Logger {
    public static DEFAULT_SCOPE = 'app';

    private static parsePathToScope(filepath: string): string {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '');
            filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
            filepath = filepath.replace('.ts', '');
            filepath = filepath.replace('.js', '');
            filepath = filepath.replace(path.sep, ':');
        }
        return filepath;
    }

    private readonly scope: string;

    constructor(scope?: string) {
        this.scope = Logger.parsePathToScope(
            scope ? scope : Logger.DEFAULT_SCOPE
        );
    }

    debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        if (winston) {
            winston[level](`${this.formatScope()} ${message}`, args);
        }
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }
}

export default Logger;

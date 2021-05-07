import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

function getEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Variable ${key} is not defined.`);
    }
    return process.env[key] as string;
}

function getUrl(): string {
    return `${getEnv('APP_PROTOCOL')}://${getEnv('APP_HOST')}:${getEnv(
        'APP_PORT'
    )}${getEnv('APP_ROUTE_PREFIX')}`;
}

export const environment = {
    node: process.env.NODE_ENV || 'development',
    production: process.env.NODE_ENV === 'production',
    development: process.env.NODE_ENV === 'development',
    app: {
        name: getEnv('APP_NAME'),
        protocol: getEnv('APP_PROTOCOL'),
        host: getEnv('APP_HOST'),
        port: getEnv('APP_PORT'),
        prefix: getEnv('APP_ROUTE_PREFIX'),
        url: getUrl(),
        secret: getEnv('APP_SECRET'),
    },
    log: {
        level: getEnv('LOG_LEVEL'),
        output: getEnv('LOG_OUTPUT'),
    },
    db: {
        dialect: getEnv('DB_DIALECT'),
        host: getEnv('DB_HOST'),
        port: getEnv('DB_PORT'),
        user: getEnv('DB_USER'),
        password: getEnv('DB_PASSWORD'),
        database: getEnv('DB_DATABASE'),
    },
};

export default environment;

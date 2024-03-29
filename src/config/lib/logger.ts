import { isUndefined } from 'lodash';
import {createLogger, transports, format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    return isConsole() ? 'debug' : 'warn'
}

const loggerType = () => {
    const env = process.env.LOOGER_TYPE;
    if (isUndefined(env)) throw new Error('Not found logger type, should be setting (server, scheduler)')
    return env.toLowerCase();
}

const isConsole = () => {
    const logFileEnv = ['production', 'dev']
    const env = process.env.NODE_ENV || 'local'
    return !logFileEnv.includes(env);
}

const logger = createLogger({
    level: level(),
    levels,
    format:
        combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        printf(logFormat()),
    ),
    transports: [
        new transports.File({
            filename: `logs/${loggerType()}/error.log`,
            level: 'error',
        }),
        new transports.File({
            filename: `logs/${loggerType()}/info.log`,
            level: 'info',
        }),
        new transports.File({
            filename: `logs/${loggerType()}/debug.log`,
            level: 'debug',
        }),
    ]
})

if (isConsole()) {
    logger.add(new transports.Console({
        format: combine(
            colorize({ all: true }),
            printf(logFormat()),
        )
    }));
}

function logFormat() {
    return (info) => `[${info.level.toUpperCase()}] ${info.timestamp} - ${info.message}`;
}

export default logger

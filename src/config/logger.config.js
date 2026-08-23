import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { config } from './env.config.js'

// Niveles personalizados (Winston no trae "fatal" ni "warning" por defecto)
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red bold',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
}

winston.addColors(customLevels.colors)

const isProduction = config.nodeEnv === 'production'

// Formato para consola: con color y timestamp legible
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
)

// Formato para archivo: sin color, en texto plano
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
)

// Transporte rotativo: solo para errores y fallas críticas
const errorRotateTransport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'warning',
    format: fileFormat
})

export const logger = winston.createLogger({
    levels: customLevels.levels,
    level: isProduction ? 'info' : 'debug',
    transports: [
        new winston.transports.Console({ format: consoleFormat }),
        errorRotateTransport
    ]
})
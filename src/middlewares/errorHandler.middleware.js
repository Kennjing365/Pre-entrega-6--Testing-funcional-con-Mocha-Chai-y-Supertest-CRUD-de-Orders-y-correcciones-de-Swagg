import { logger } from '../config/logger.config.js'

export const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const code = err.code || 'INTERNAL_ERROR'
    const message = err.statusCode ? err.message : 'Error interno del servidor'

    if (statusCode >= 500) {
        logger.error(`${req.method} ${req.originalUrl} - ${err.message}`)
    } else {
        logger.warning(`${req.method} ${req.originalUrl} - [${code}] ${err.message}`)
    }

    return res.status(statusCode).json({
        status: 'error',
        code,
        message
    })
}
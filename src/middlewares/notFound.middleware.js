import { logger } from '../config/logger.config.js'

export const notFoundMiddleware = (req, res, next) => {
    logger.warning(`Ruta inexistente: ${req.method} ${req.originalUrl}`)
    return res.status(404).json({
        status: 'error',
        code: 'ROUTE_NOT_FOUND',
        message: 'La ruta solicitada no existe'
    })
}
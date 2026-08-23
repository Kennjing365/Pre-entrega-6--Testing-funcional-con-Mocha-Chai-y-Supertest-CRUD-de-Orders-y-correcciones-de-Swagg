import { logger } from '../config/logger.config.js'

export const testLoggerController = (req, res) => {
    logger.debug('Este es un mensaje de nivel debug')
    logger.http('Este es un mensaje de nivel http')
    logger.info('Este es un mensaje de nivel info')
    logger.warning('Este es un mensaje de nivel warning')
    logger.error('Este es un mensaje de nivel error')
    logger.fatal('Este es un mensaje de nivel fatal')

    return res.status(200).json({
        status: 'success',
        message: 'Se generaron logs de todos los niveles. Revisá la consola y la carpeta logs/'
    })
}
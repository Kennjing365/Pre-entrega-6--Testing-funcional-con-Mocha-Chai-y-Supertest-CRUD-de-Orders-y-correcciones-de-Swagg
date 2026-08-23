import mongoose from 'mongoose'
import app from './app.js'
import { config } from './config/env.config.js'
import { logger } from './config/logger.config.js'

mongoose.connect(config.mongoUri)
    .then(() => {
        logger.info('Conexión a MongoDB establecida')
        app.listen(config.port, () => {
            logger.info(`Servidor ShipNow escuchando en el puerto ${config.port}`)
        })
    })
    .catch((error) => {
        logger.fatal(`Error al conectar a MongoDB: ${error.message}`)
        process.exit(1)
    })
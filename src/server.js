import mongoose from 'mongoose'
import app from './app.js'
import { config } from './config/env.config.js'
mongoose.connect(config.mongoUri)
    .then(() => {
        console.log('Conectado a MongoDB')
        app.listen(config.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.port}`)
        })
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error.message)
        process.exit(1)
    })
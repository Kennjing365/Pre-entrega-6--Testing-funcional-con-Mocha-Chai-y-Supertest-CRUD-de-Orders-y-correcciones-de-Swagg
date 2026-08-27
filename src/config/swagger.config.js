import swaggerJsdoc from 'swagger-jsdoc'
import { config } from './env.config.js'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShipNow API',
            version: '1.0.0',
            description: 'API backend para una plataforma de gestión de envíos/delivery. Administra usuarios, productos, pedidos y entregas, con arquitectura por capas, mocking de datos de prueba, manejo centralizado de errores y logging profesional.'
        },
        servers: [
            {
                url: `http://localhost:${config.port}`,
                description: 'Servidor local de desarrollo'
            }
        ],
        tags: [
            { name: 'Users', description: 'Gestión de usuarios (clientes, repartidores, administradores)' },
            { name: 'Products', description: 'Gestión de productos del catálogo' },
            { name: 'Orders', description: 'Pedidos generados mediante el módulo de mocking' },
            { name: 'Deliveries', description: 'Entregas generadas mediante el módulo de mocking' },
            { name: 'Mocks', description: 'Generación y siembra de datos de prueba' },
            { name: 'Logger', description: 'Endpoint interno de validación del sistema de logging' }
        ],
        components: {
            schemas: {}   // se completa a través de los JSDoc en cada archivo de rutas
        }
    },
    apis: ['./src/routes/*.js'],   // Swagger va a leer los comentarios JSDoc de todos los archivos acá
    apis: ['./src/routes/*.js', './src/docs/*.js']
}

export const swaggerSpec = swaggerJsdoc(options)
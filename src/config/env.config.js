import 'dotenv/config'

const REQUIRED_VARS = ['PORT', 'MONGODB_URI', 'NODE_ENV']

const validateEnv = () => {
    const missing = REQUIRED_VARS.filter((key) => !process.env[key])

    if (missing.length > 0) {
        throw new Error(
            `Faltan variables de entorno obligatorias: ${missing.join(', ')}. Revisá tu archivo .env`
        )
    }
}

validateEnv()

export const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV
}
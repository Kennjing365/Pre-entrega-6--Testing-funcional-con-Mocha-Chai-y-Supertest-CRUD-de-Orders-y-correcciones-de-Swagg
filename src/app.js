import express from 'express'
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'
import mockRouter from './routes/mock.routes.js'
import loggerRouter from './routes/logger.routes.js'
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js'
import { notFoundMiddleware } from './middlewares/notFound.middleware.js'

const app = express()

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor activo' })
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/mocks', mockRouter)
app.use('/api/logger', loggerRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
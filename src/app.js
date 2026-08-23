import express from 'express'
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'
import mockRouter from './routes/mock.routes.js'
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js'

const app = express()

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor activo' })
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/mocks', mockRouter)

//Middleware de errores
app.use(errorHandlerMiddleware)

export default app
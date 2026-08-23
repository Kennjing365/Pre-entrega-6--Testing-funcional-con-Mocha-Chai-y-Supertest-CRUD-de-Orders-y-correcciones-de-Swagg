export const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.name || 'Error'}: ${err.message}`)

    const statusCode = err.statusCode || 500
    const code = err.code || 'INTERNAL_ERROR'
    const message = err.statusCode ? err.message : 'Error interno del servidor'

    return res.status(statusCode).json({
        status: 'error',
        code,
        message
    })
}
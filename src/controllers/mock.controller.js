import { generateUsersMock, seedUsers, seedOrders, seedDeliveries } from '../services/mock.service.js'

const handleError = (res, errorKey) => {
    const map = {
        sin_clientes: { status: 400, message: 'No hay usuarios con rol CLIENTE para asociar pedidos. Sembrá usuarios primero.' },
        sin_datos_relacionados: { status: 400, message: 'No hay pedidos o repartidores suficientes para generar entregas.' }
    }
    const known = map[errorKey] || { status: 500, message: 'Error interno del servidor' }
    return res.status(known.status).json({ status: 'error', message: known.message })
}

export const getMockUsers = async (req, res) => {
    try {
        const qty = parseInt(req.query.qty) || 1
        const users = generateUsersMock(qty)
        return res.status(200).json(users)
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const seedUsersController = async (req, res) => {
    try {
        const qty = parseInt(req.query.qty) || 1
        const result = await seedUsers(qty)
        return res.status(201).json(result)
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const seedOrdersController = async (req, res) => {
    try {
        const qty = parseInt(req.query.qty) || 1
        const result = await seedOrders(qty)
        if (result.error) return handleError(res, result.error)
        return res.status(201).json(result)
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}

export const seedDeliveriesController = async (req, res) => {
    try {
        const qty = parseInt(req.query.qty) || 1
        const result = await seedDeliveries(qty)
        if (result.error) return handleError(res, result.error)
        return res.status(201).json(result)
    } catch (error) {
        return handleError(res, 'error_interno')
    }
}
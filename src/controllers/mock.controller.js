import { generateUsersMock, seedUsers, seedOrders, seedDeliveries } from '../services/mock.service.js'

export const getMockUsers = async (req, res, next) => {
    try {
        const qty = parseInt(req.query.qty)
        const users = generateUsersMock(qty)
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const seedUsersController = async (req, res, next) => {
    try {
        const qty = parseInt(req.query.qty)
        const result = await seedUsers(qty)
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

export const seedOrdersController = async (req, res, next) => {
    try {
        const qty = parseInt(req.query.qty)
        const result = await seedOrders(qty)
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

export const seedDeliveriesController = async (req, res, next) => {
    try {
        const qty = parseInt(req.query.qty)
        const result = await seedDeliveries(qty)
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
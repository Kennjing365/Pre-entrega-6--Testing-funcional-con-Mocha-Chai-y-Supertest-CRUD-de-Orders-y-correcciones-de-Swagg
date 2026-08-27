import { getAllOrdersService, getOrderByIdService, createOrderService, updateOrderStatusService } from '../services/order.service.js'

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrdersService()
        res.status(200).json({ status: 'success', payload: orders })
    } catch (error) { next(error) }
}

export const getOrderById = async (req, res, next) => {
    try {
        const order = await getOrderByIdService(req.params.id)
        res.status(200).json({ status: 'success', payload: order })
    } catch (error) { next(error) }
}

export const createOrderController = async (req, res, next) => {
    try {
        const order = await createOrderService(req.body)
        res.status(201).json({ status: 'success', payload: order })
    } catch (error) { next(error) }
}

export const updateOrderStatusController = async (req, res, next) => {
    try {
        const order = await updateOrderStatusService(req.params.id, req.body.status)
        res.status(200).json({ status: 'success', payload: order })
    } catch (error) { next(error) }
}
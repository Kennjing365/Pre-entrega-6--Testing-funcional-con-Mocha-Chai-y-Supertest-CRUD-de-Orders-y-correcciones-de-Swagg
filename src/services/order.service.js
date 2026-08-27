import { findAllOrders, findOrderById, createOrder, updateOrderStatusById } from '../repositories/order.repository.js'
import { findUserById } from '../repositories/user.repository.js'
import { ORDER_STATUS } from '../constants/index.js'
import { ErrorDictionary } from '../error/errorDictionary.js'

export const getAllOrdersService = async () => findAllOrders()

export const getOrderByIdService = async (id) => {
    const order = await findOrderById(id)
    if (!order) throw ErrorDictionary.ORDER_NOT_FOUND()
    return order
}

export const createOrderService = async ({ user, address, priority }) => {
    if (!user || !address) {
        throw ErrorDictionary.ORDER_MISSING_FIELDS()
    }
    const existingUser = await findUserById(user)
    if (!existingUser) {
        throw ErrorDictionary.USER_NOT_FOUND()
    }
    return createOrder({ user, address, priority })
}

export const updateOrderStatusService = async (id, status) => {
    if (!Object.values(ORDER_STATUS).includes(status)) {
        throw ErrorDictionary.ORDER_INVALID_STATUS()
    }
    const order = await findOrderById(id)
    if (!order) throw ErrorDictionary.ORDER_NOT_FOUND()
    return updateOrderStatusById(id, status)
}
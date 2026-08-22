import { userModel } from '../models/user.model.js'
import { orderModel } from '../models/order.model.js'
import { deliveryModel } from '../models/delivery.model.js'

export const insertMockUsers = async (usersData) => {
    return userModel.insertMany(usersData)
}

export const insertMockOrders = async (ordersData) => {
    return orderModel.insertMany(ordersData)
}

export const insertMockDeliveries = async (deliveriesData) => {
    return deliveryModel.insertMany(deliveriesData)
}

export const findRandomUsersByRole = async (role, limit) => {
    return userModel.aggregate([
        { $match: { role } },
        { $sample: { size: limit } }
    ])
}

export const findRandomOrders = async (limit) => {
    return orderModel.aggregate([{ $sample: { size: limit } }])
}
import { orderModel } from '../models/order.model.js'

export const findAllOrders = async () => orderModel.find()
export const findOrderById = async (id) => orderModel.findById(id)
export const createOrder = async (data) => orderModel.create(data)
export const updateOrderStatusById = async (id, status) =>
    orderModel.findByIdAndUpdate(id, { status }, { new: true })
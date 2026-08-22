import { Schema, model } from 'mongoose'
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/index.js'

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    repartidor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    },
    priority: {
        type: String,
        enum: Object.values(ORDER_PRIORITY),
        default: ORDER_PRIORITY.MEDIUM
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const orderModel = model('order', orderSchema)
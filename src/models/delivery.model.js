import { Schema, model } from 'mongoose'
import { ORDER_STATUS } from '../constants/index.js'

const deliverySchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    repartidor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.ASSIGNED
    },
    deliveredAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export const deliveryModel = model('delivery', deliverySchema)
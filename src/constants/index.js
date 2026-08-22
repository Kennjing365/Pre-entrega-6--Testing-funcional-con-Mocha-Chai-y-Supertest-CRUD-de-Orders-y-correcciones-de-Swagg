export const USER_ROLES = Object.freeze({
    ADMIN: 'ADMIN',
    USER: 'CLIENTE',
    REPARTIDOR: 'REPARTIDOR'
})

export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: 'AVAILABLE',
    OUT_OF_STOCK: 'OUT_OF_STOCK',
    DISCONTINUED: 'DISCONTINUED'
})

export const ORDER_STATUS = Object.freeze({
    PENDING: 'PENDING',
    ASSIGNED: 'ASSIGNED',
    IN_TRANSIT: 'IN_TRANSIT',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
})

export const ORDER_PRIORITY = Object.freeze({
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH' 
})
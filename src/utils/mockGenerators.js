import { faker } from '@faker-js/faker'
import { USER_ROLES, ORDER_STATUS, ORDER_PRIORITY } from '../constants/index.js'

export const generateMockUser = () => {
    const roles = Object.values(USER_ROLES)
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 10 }),
        role: roles[Math.floor(Math.random() * roles.length)]
    }
}

export const generateMockOrder = (userId) => {
    const priorities = Object.values(ORDER_PRIORITY)
    return {
        user: userId,
        status: ORDER_STATUS.PENDING,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        address: faker.location.streetAddress()
    }
}

export const generateMockDelivery = (orderId, repartidorId) => {
    return {
        order: orderId,
        repartidor: repartidorId,
        status: ORDER_STATUS.ASSIGNED
    }
}
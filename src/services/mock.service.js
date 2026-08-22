import { generateMockUser, generateMockOrder, generateMockDelivery } from '../utils/mockGenerators.js'
import { insertMockUsers, insertMockOrders, insertMockDeliveries, findRandomUsersByRole, findRandomOrders } from '../repositories/mock.repository.js'
import { USER_ROLES } from '../constants/index.js'

// Genera SIN guardar
export const generateUsersMock = (qty) => {
    const users = []
    for (let i = 0; i < qty; i++) {
        users.push(generateMockUser())
    }
    return users
}

// Inserta en la base
export const seedUsers = async (qty) => {
    const usersData = generateUsersMock(qty)
    const inserted = await insertMockUsers(usersData)
    return { insertados: inserted.length, coleccion: 'usuarios' }
}

export const seedOrders = async (qty) => {
    // Necesitamos usuarios con rol CLIENTE ya existentes para asociar el pedido
    const clientes = await findRandomUsersByRole(USER_ROLES.CLIENTE, qty)

    if (clientes.length === 0) {
        return { error: 'sin_clientes' }
    }

    const ordersData = []
    for (let i = 0; i < qty; i++) {
        const randomCliente = clientes[Math.floor(Math.random() * clientes.length)]
        ordersData.push(generateMockOrder(randomCliente._id))
    }

    const inserted = await insertMockOrders(ordersData)
    return { insertados: inserted.length, coleccion: 'pedidos' }
}

export const seedDeliveries = async (qty) => {
    const orders = await findRandomOrders(qty)
    const repartidores = await findRandomUsersByRole(USER_ROLES.REPARTIDOR, qty)

    if (orders.length === 0 || repartidores.length === 0) {
        return { error: 'sin_datos_relacionados' }
    }

    const deliveriesData = []
    for (let i = 0; i < qty; i++) {
        const randomOrder = orders[Math.floor(Math.random() * orders.length)]
        const randomRepartidor = repartidores[Math.floor(Math.random() * repartidores.length)]
        deliveriesData.push(generateMockDelivery(randomOrder._id, randomRepartidor._id))
    }

    const inserted = await insertMockDeliveries(deliveriesData)
    return { insertados: inserted.length, coleccion: 'entregas' }
}

import { generateMockUser, generateMockOrder, generateMockDelivery } from '../utils/mockGenerators.js'
import { insertMockUsers, insertMockOrders, insertMockDeliveries, findRandomUsersByRole, findRandomOrders } from '../repositories/mock.repository.js'
import { USER_ROLES } from '../constants/index.js'
import { ErrorDictionary } from '../error/errorDictionary.js'

const MAX_QTY = 100

const validateQty = (qty) => {
    if (!Number.isInteger(qty) || qty <= 0) {
        throw ErrorDictionary.MOCK_INVALID_QTY()
    }
    if (qty > MAX_QTY) {
        throw ErrorDictionary.MOCK_QTY_TOO_LARGE()
    }
}

export const generateUsersMock = (qty) => {
    validateQty(qty)

    const users = []
    for (let i = 0; i < qty; i++) {
        users.push(generateMockUser())
    }
    return users
}

export const seedUsers = async (qty) => {
    validateQty(qty)

    const usersData = generateUsersMock(qty)

    try {
        const inserted = await insertMockUsers(usersData)
        return { insertados: inserted.length, coleccion: 'usuarios' }
    } catch (error) {
        throw ErrorDictionary.MOCK_SEED_FAILED()
    }
}

export const seedOrders = async (qty) => {
    validateQty(qty)

    const clientes = await findRandomUsersByRole(USER_ROLES.CLIENTE, qty)

    if (clientes.length === 0) {
        throw ErrorDictionary.MOCK_NO_CLIENTS_AVAILABLE()
    }

    const ordersData = []
    for (let i = 0; i < qty; i++) {
        const randomCliente = clientes[Math.floor(Math.random() * clientes.length)]
        ordersData.push(generateMockOrder(randomCliente._id))
    }

    try {
        const inserted = await insertMockOrders(ordersData)
        return { insertados: inserted.length, coleccion: 'pedidos' }
    } catch (error) {
        throw ErrorDictionary.MOCK_SEED_FAILED()
    }
}

export const seedDeliveries = async (qty) => {
    validateQty(qty)

    const orders = await findRandomOrders(qty)
    const repartidores = await findRandomUsersByRole(USER_ROLES.REPARTIDOR, qty)

    if (orders.length === 0 || repartidores.length === 0) {
        throw ErrorDictionary.MOCK_NO_RELATED_DATA()
    }

    const deliveriesData = []
    for (let i = 0; i < qty; i++) {
        const randomOrder = orders[Math.floor(Math.random() * orders.length)]
        const randomRepartidor = repartidores[Math.floor(Math.random() * repartidores.length)]
        deliveriesData.push(generateMockDelivery(randomOrder._id, randomRepartidor._id))
    }

    try {
        const inserted = await insertMockDeliveries(deliveriesData)
        return { insertados: inserted.length, coleccion: 'entregas' }
    } catch (error) {
        throw ErrorDictionary.MOCK_SEED_FAILED()
    }
}
import { generateMockUser, generateMockOrder, generateMockDelivery } from '../utils/mockGenerators.js'
import { insertMockUsers, insertMockOrders, insertMockDeliveries, findRandomUsersByRole, findRandomOrders } from '../repositories/mock.repository.js'
import { USER_ROLES } from '../constants/index.js'
import { ErrorDictionary } from '../error/errorDictionary.js'
import { logger } from '../config/logger.config.js'

const MAX_QTY = 100

const validateQty = (qty) => {
    if (!Number.isInteger(qty) || qty <= 0) {
        logger.warning(`Cantidad inválida enviada al endpoint de mocks: ${qty}`)
        throw ErrorDictionary.MOCK_INVALID_QTY()
    }
    if (qty > MAX_QTY) {
        logger.warning(`Cantidad excesiva enviada al endpoint de mocks: ${qty}`)
        throw ErrorDictionary.MOCK_QTY_TOO_LARGE()
    }
}

export const generateUsersMock = (qty) => {
    validateQty(qty)
    logger.debug(`Generando ${qty} usuarios mock (sin persistir)`)

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
        logger.info(`Se sembraron ${inserted.length} usuarios de prueba en MongoDB`)
        return { insertados: inserted.length, coleccion: 'usuarios' }
    } catch (error) {
        logger.error(`Falló la siembra de usuarios mock: ${error.message}`)
        throw ErrorDictionary.MOCK_SEED_FAILED()
    }
}

export const seedOrders = async (qty) => {
    validateQty(qty)

    const clientes = await findRandomUsersByRole(USER_ROLES.CLIENTE, qty)

    if (clientes.length === 0) {
        logger.warning('No hay usuarios CLIENTE disponibles para generar pedidos mock')
        throw ErrorDictionary.MOCK_NO_CLIENTS_AVAILABLE()
    }

    const ordersData = []
    for (let i = 0; i < qty; i++) {
        const randomCliente = clientes[Math.floor(Math.random() * clientes.length)]
        ordersData.push(generateMockOrder(randomCliente._id))
    }

    try {
        const inserted = await insertMockOrders(ordersData)
        logger.info(`Se sembraron ${inserted.length} pedidos de prueba en MongoDB`)
        return { insertados: inserted.length, coleccion: 'pedidos' }
    } catch (error) {
        logger.error(`Falló la siembra de pedidos mock: ${error.message}`)
        throw ErrorDictionary.MOCK_SEED_FAILED()
    }
}

export const seedDeliveries = async (qty) => {
    validateQty(qty)

    const orders = await findRandomOrders(qty)
    const repartidores = await findRandomUsersByRole(USER_ROLES.REPARTIDOR, qty)

    if (orders.length === 0 || repartidores.length === 0) {
        logger.warning('No hay pedidos o repartidores suficientes para generar entregas mock')
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
        logger.info(`Se sembraron ${inserted.length} entregas de prueba en MongoDB`)
        return { insertados: inserted.length, coleccion: 'entregas' }
    } catch (error) {
        logger.error(`Falló la siembra de entregas mock: ${error.message}`)
        throw ErrorDictionary.MOCK_SEED_FAILED()
    }
}
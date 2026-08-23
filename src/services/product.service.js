import {
    findAllProducts,
    findProductById,
    createProduct,
    updateProductById,
    deleteProductById
} from '../repositories/product.repository.js'
import { PRODUCT_STATUS } from '../constants/index.js'
import { ErrorDictionary } from '../error/errorDictionary.js'
import { logger } from '../config/logger.config.js'

export const getAllProductsService = async ({ onlyAvailable } = {}) => {
    const filter = {}
    if (onlyAvailable === 'true') {
        filter.status = PRODUCT_STATUS.AVAILABLE
        filter.stock = { $gt: 0 }
    }
    return findAllProducts(filter)
}

export const getProductByIdService = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        logger.warning(`Producto no encontrado: ${id}`)
        throw ErrorDictionary.PRODUCT_NOT_FOUND()
    }
    return product
}

export const createProductService = async (productData) => {
    const { name, price, stock } = productData

    if (!name || price === undefined) {
        throw ErrorDictionary.PRODUCT_MISSING_FIELDS()
    }
    if (price < 0) {
        throw ErrorDictionary.PRODUCT_INVALID_PRICE()
    }
    if (stock !== undefined && stock < 0) {
        throw ErrorDictionary.PRODUCT_INVALID_STOCK()
    }

    const status = (!stock || stock === 0) ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE

    const newProduct = await createProduct({ ...productData, status })
    logger.info(`Producto creado correctamente: ${newProduct.name} (id: ${newProduct._id})`)
    return newProduct
}

export const updateProductService = async (id, updateData) => {
    const product = await findProductById(id)
    if (!product) {
        logger.warning(`Intento de actualizar producto inexistente: ${id}`)
        throw ErrorDictionary.PRODUCT_NOT_FOUND()
    }

    if (updateData.price !== undefined && updateData.price < 0) {
        throw ErrorDictionary.PRODUCT_INVALID_PRICE()
    }

    if (updateData.stock !== undefined) {
        updateData.status = updateData.stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE
    }

    const updated = await updateProductById(id, updateData)
    logger.info(`Producto actualizado: ${id}`)
    return updated
}

export const deleteProductService = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        throw ErrorDictionary.PRODUCT_NOT_FOUND()
    }
    await deleteProductById(id)
    logger.info(`Producto eliminado: ${id}`)
    return { deleted: true }
}